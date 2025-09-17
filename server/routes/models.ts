import express, { Request, Response } from "express";
import { eq } from "drizzle-orm";
import { getDatabase, aiModels } from "../../server/config/database";
import { createError } from "../../server/middleware/errorHandler";
import { testGemini, testOpenAI, testLocalModel } from "../services/modelTests";

const router = express.Router();

// Get all AI models
router.get("/", async (req: Request, res: Response) => {
  try {
    const db = getDatabase();
    const models = await db.select().from(aiModels).orderBy(aiModels.createdAt);

    res.json(models);
  } catch (error) {
    console.error("Error fetching models:", error);
    throw createError("Failed to fetch models", 500);
  }
});

// Create new AI model
router.post("/", async (req: Request, res: Response) => {
  try {
    const { name, provider, modelId, apiKey, baseUrl, config } = req.body;
    const db = getDatabase();

    // Validation
    if (!name || !provider || !modelId) {
      throw createError("Name, provider, and modelId are required", 400);
    }

    if (!["openai", "gemini", "local", "custom"].includes(provider)) {
      throw createError(
        "Invalid provider. Must be one of: openai, gemini, local, custom",
        400,
      );
    }

    const newModel = await db
      .insert(aiModels)
      .values({
        name: name.trim(),
        provider,
        modelId: modelId.trim(),
        apiKey: apiKey?.trim() || null,
        baseUrl: baseUrl?.trim() || null,
        config: config || {},
      })
      .returning();

    res.json(newModel[0]);
  } catch (error) {
    console.error("Error creating model:", error);
    if (error instanceof Error && "statusCode" in error) {
      throw error;
    }
    throw createError("Failed to create model", 500);
  }
});

// Update AI model
router.put("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, provider, modelId, apiKey, baseUrl, config, isActive } =
      req.body;
    const db = getDatabase();

    // Validation
    if (
      provider &&
      !["openai", "gemini", "local", "custom"].includes(provider)
    ) {
      throw createError(
        "Invalid provider. Must be one of: openai, gemini, local, custom",
        400,
      );
    }

    const updateData: any = {};
    if (name !== undefined) updateData.name = name.trim();
    if (provider !== undefined) updateData.provider = provider;
    if (modelId !== undefined) updateData.modelId = modelId.trim();
    if (apiKey !== undefined) updateData.apiKey = apiKey?.trim() || null;
    if (baseUrl !== undefined) updateData.baseUrl = baseUrl?.trim() || null;
    if (config !== undefined) updateData.config = config;
    if (isActive !== undefined) updateData.isActive = isActive;

    const updatedModel = await db
      .update(aiModels)
      .set(updateData)
      .where(eq(aiModels.id, id))
      .returning();

    if (updatedModel.length === 0) {
      throw createError("Model not found", 404);
    }

    res.json(updatedModel[0]);
  } catch (error) {
    console.error("Error updating model:", error);
    if (error instanceof Error && "statusCode" in error) {
      throw error;
    }
    throw createError("Failed to update model", 500);
  }
});

// Delete AI model
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const db = getDatabase();

    const deletedModel = await db
      .delete(aiModels)
      .where(eq(aiModels.id, id))
      .returning();

    if (deletedModel.length === 0) {
      throw createError("Model not found", 404);
    }

    res.json({ message: "Model deleted successfully", id });
  } catch (error) {
    console.error("Error deleting model:", error);
    if (error instanceof Error && "statusCode" in error) {
      throw error;
    }
    throw createError("Failed to delete model", 500);
  }
});

// Test AI model connection
router.post("/:id/test", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const db = getDatabase();

    const model = await db
      .select()
      .from(aiModels)
      .where(eq(aiModels.id, id))
      .limit(1);

    if (!model.length) {
      throw createError("Model not found", 404);
    }

    const modelData = model[0];
    let testResult: { success: boolean; message: string } = {
      success: false,
      message: "",
    };

    // Test based on provider
    switch (modelData.provider) {
      case "openai":
        testResult = await testOpenAI(modelData);
        break;
      case "gemini":
        testResult = await testGemini(modelData);
        break;
      case "local":
        testResult = await testLocalModel(modelData);
        break;
      default:
        testResult = { success: false, message: "Unknown provider" };
    }

    res.json(testResult);
  } catch (error) {
    console.error("Error testing model:", error);
    if (error instanceof Error && "statusCode" in error) {
      throw error;
    }
    throw createError("Failed to test model", 500);
  }
});

export default router;
