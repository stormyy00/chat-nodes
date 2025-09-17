import {
  pgTable,
  text,
  timestamp,
  uuid,
  json,
  boolean,
  integer,
} from "drizzle-orm/pg-core";

export const conversations = pgTable("conversations", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  isActive: boolean("is_active").default(true).notNull(),
});

export const messages = pgTable("messages", {
  id: uuid("id").primaryKey().defaultRandom(),
  conversationId: uuid("conversation_id")
    .references(() => conversations.id)
    .notNull(),
  content: text("content").notNull(),
  role: text("role", { enum: ["user", "assistant", "system"] }).notNull(),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
  metadata: json("metadata"),
});

export const aiModels = pgTable("ai_models", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  provider: text("provider", {
    enum: ["openai", "gemini", "local", "custom"],
  }).notNull(),
  modelId: text("model_id").notNull(),
  apiKey: text("api_key"),
  baseUrl: text("base_url"),
  isActive: boolean("is_active").default(true).notNull(),
  config: json("config"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const conversationNodes = pgTable("conversation_nodes", {
  id: uuid("id").primaryKey().defaultRandom(),
  conversationId: uuid("conversation_id")
    .references(() => conversations.id)
    .notNull(),
  parentNodeId: uuid("parent_node_id").references(() => conversationNodes.id),
  title: text("title").notNull(),
  messageId: uuid("message_id").references(() => messages.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  order: integer("order").default(0).notNull(),
});

export type Conversation = typeof conversations.$inferSelect;
export type NewConversation = typeof conversations.$inferInsert;
export type Message = typeof messages.$inferSelect;
export type NewMessage = typeof messages.$inferInsert;
export type AIModel = typeof aiModels.$inferSelect;
export type NewAIModel = typeof aiModels.$inferInsert;
export type ConversationNode = typeof conversationNodes.$inferSelect;
export type NewConversationNode = typeof conversationNodes.$inferInsert;
