import express from "express";
import cors from "cors";
import { WebSocketServer } from "ws";
import http from "http";
import dotenv from "dotenv";
import { errorHandler } from "./middleware/errorHandler";
import { requestLogger } from "./middleware/requestLogger";
import chatRoutes from "./routes/chat";
import modelRoutes from "./routes/models";
import { initializeDatabase } from "./config/database";

// Load environment variables
dotenv.config();

const app = express();
const server = http.createServer(app);

// Initialize database connection
initializeDatabase();

// Middleware
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  }),
);
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version || "1.0.0",
  });
});

// API Routes
app.use("/api/chat", chatRoutes);
app.use("/api/models", modelRoutes);

// WebSocket server for real-time chat
const wss = new WebSocketServer({ server });

interface WebSocketMessage {
  type: string;
  data?: any;
}

wss.on("connection", (ws) => {
  console.log("🔌 New WebSocket connection established");

  ws.on("message", async (data) => {
    try {
      const message: WebSocketMessage = JSON.parse(data.toString());
      console.log("📨 Received WebSocket message:", message.type);

      // Handle different message types
      switch (message.type) {
        case "chat":
          // Process chat message and send response
          break;
        case "ping":
          ws.send(
            JSON.stringify({
              type: "pong",
              timestamp: new Date().toISOString(),
            }),
          );
          break;
        default:
          console.log("❓ Unknown message type:", message.type);
      }
    } catch (error) {
      console.error("❌ Error processing WebSocket message:", error);
      ws.send(
        JSON.stringify({
          type: "error",
          message: "Invalid message format",
        }),
      );
    }
  });

  ws.on("close", () => {
    console.log("🔌 WebSocket connection closed");
  });

  ws.on("error", (error) => {
    console.error("❌ WebSocket error:", error);
  });
});

// Error handling middleware (must be last)
app.use(errorHandler);

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({
    error: "Route not found",
    path: req.originalUrl,
    method: req.method,
  });
});

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`🔗 API base: http://localhost:${PORT}/api`);
  console.log(`🌐 Environment: ${process.env.NODE_ENV || "development"}`);
});

// Graceful shutdown
process.on("SIGTERM", () => {
  console.log("🛑 SIGTERM received, shutting down gracefully");
  server.close(() => {
    console.log("✅ Server closed");
    process.exit(0);
  });
});

process.on("SIGINT", () => {
  console.log("🛑 SIGINT received, shutting down gracefully");
  server.close(() => {
    console.log("✅ Server closed");
    process.exit(0);
  });
});

export default app;
