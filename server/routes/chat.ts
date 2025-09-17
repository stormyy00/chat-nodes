import express, { Request, Response } from "express";
import { eq } from "drizzle-orm";
import {
  getDatabase,
  conversations,
  messages,
  conversationNodes,
  aiModels,
} from "../../server/config/database";
import aiService from "../services/aiService";
import { createError } from "../../server/middleware/errorHandler";

const router = express.Router();

// Get all conversations
router.get("/conversations", async (req: Request, res: Response) => {
  try {
    const db = getDatabase();
    const allConversations = await db
      .select()
      .from(conversations)
      .orderBy(conversations.updatedAt);

    res.json(allConversations);
  } catch (error) {
    console.error("Error fetching conversations:", error);
    throw createError("Failed to fetch conversations", 500);
  }
});

// Create new conversation
router.post("/conversations", async (req: Request, res: Response) => {
  try {
    const { title } = req.body;
    const db = getDatabase();

    const newConversation = await db
      .insert(conversations)
      .values({
        title: title || "New Conversation",
      })
      .returning();

    res.json(newConversation[0]);
  } catch (error) {
    console.error("Error creating conversation:", error);
    throw createError("Failed to create conversation", 500);
  }
});

// Update conversation
router.put("/conversations/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title } = req.body;
    const db = getDatabase();

    if (!title || title.trim().length === 0) {
      throw createError("Title is required", 400);
    }

    const updatedConversation = await db
      .update(conversations)
      .set({
        title: title.trim(),
        updatedAt: new Date(),
      })
      .where(eq(conversations.id, id))
      .returning();

    if (updatedConversation.length === 0) {
      throw createError("Conversation not found", 404);
    }

    res.json(updatedConversation[0]);
  } catch (error) {
    console.error("Error updating conversation:", error);
    if (error instanceof Error && "statusCode" in error) {
      throw error;
    }
    throw createError("Failed to update conversation", 500);
  }
});

// Delete conversation
router.delete("/conversations/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const db = getDatabase();

    // First delete all messages in the conversation
    await db.delete(messages).where(eq(messages.conversationId, id));

    // Then delete all conversation nodes
    await db
      .delete(conversationNodes)
      .where(eq(conversationNodes.conversationId, id));

    // Finally delete the conversation
    const deletedConversation = await db
      .delete(conversations)
      .where(eq(conversations.id, id))
      .returning();

    if (deletedConversation.length === 0) {
      throw createError("Conversation not found", 404);
    }

    res.json({ message: "Conversation deleted successfully", id });
  } catch (error) {
    console.error("Error deleting conversation:", error);
    if (error instanceof Error && "statusCode" in error) {
      throw error;
    }
    throw createError("Failed to delete conversation", 500);
  }
});

// Get messages for a conversation
router.get(
  "/conversations/:id/messages",
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const db = getDatabase();

      const conversationMessages = await db
        .select()
        .from(messages)
        .where(eq(messages.conversationId, id))
        .orderBy(messages.timestamp);

      res.json(conversationMessages);
    } catch (error) {
      console.error("Error fetching messages:", error);
      throw createError("Failed to fetch messages", 500);
    }
  },
);

// Send message
router.post(
  "/conversations/:id/messages",
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { content, role = "user" } = req.body;
      const db = getDatabase();

      if (!content || content.trim().length === 0) {
        throw createError("Message content is required", 400);
      }

      const newMessage = await db
        .insert(messages)
        .values({
          conversationId: id,
          content: content.trim(),
          role,
        })
        .returning();

      // Update conversation timestamp
      await db
        .update(conversations)
        .set({ updatedAt: new Date() })
        .where(eq(conversations.id, id));

      res.json(newMessage[0]);
    } catch (error) {
      console.error("Error sending message:", error);
      if (error instanceof Error && "statusCode" in error) {
        throw error;
      }
      throw createError("Failed to send message", 500);
    }
  },
);

// Generate AI response
router.post("/generate", async (req: Request, res: Response) => {
  try {
    const {
      conversationId,
      modelId,
      messages: conversationMessages,
    } = req.body;
    const db = getDatabase();

    if (!conversationId || !modelId || !conversationMessages) {
      throw createError(
        "conversationId, modelId, and messages are required",
        400,
      );
    }

    // Get the model configuration
    const model = await db
      .select()
      .from(aiModels)
      .where(eq(aiModels.id, modelId))
      .limit(1);

    if (!model.length) {
      throw createError("Model not found", 404);
    }

    const modelData = model[0];

    // Convert messages to the format expected by AI service
    const aiMessages = conversationMessages.map((msg: any) => ({
      role: msg.role,
      content: msg.content,
    }));

    // Generate AI response
    const aiResponse = await aiService.generateResponse(modelData, aiMessages);

    // Save the AI response to database
    const newMessage = await db
      .insert(messages)
      .values({
        conversationId,
        content: aiResponse.content,
        role: "assistant",
        metadata: {
          model: aiResponse.model,
          usage: aiResponse.usage,
        },
      })
      .returning();

    // Update conversation timestamp
    await db
      .update(conversations)
      .set({ updatedAt: new Date() })
      .where(eq(conversations.id, conversationId));

    res.json(newMessage[0]);
  } catch (error) {
    console.error("Error generating AI response:", error);
    if (error instanceof Error && "statusCode" in error) {
      throw error;
    }
    throw createError("Failed to generate response", 500);
  }
});

// Get conversation nodes
router.get("/conversations/:id/nodes", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const db = getDatabase();

    const nodes = await db
      .select()
      .from(conversationNodes)
      .where(eq(conversationNodes.conversationId, id))
      .orderBy(conversationNodes.order);

    res.json(nodes);
  } catch (error) {
    console.error("Error fetching nodes:", error);
    throw createError("Failed to fetch nodes", 500);
  }
});

// Create conversation node
router.post("/conversations/:id/nodes", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, parentNodeId, messageId, order } = req.body;
    const db = getDatabase();

    if (!title || title.trim().length === 0) {
      throw createError("Node title is required", 400);
    }

    const newNode = await db
      .insert(conversationNodes)
      .values({
        conversationId: id,
        title: title.trim(),
        parentNodeId,
        messageId,
        order: order || 0,
      })
      .returning();

    res.json(newNode[0]);
  } catch (error) {
    console.error("Error creating node:", error);
    if (error instanceof Error && "statusCode" in error) {
      throw error;
    }
    throw createError("Failed to create node", 500);
  }
});

export default router;
