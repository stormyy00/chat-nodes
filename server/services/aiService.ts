import { GoogleGenerativeAI } from "@google/generative-ai";
import { AIModel } from "../../server/db/schema";
import { createError } from "../../server/middleware/errorHandler";

export interface Message {
  role: "user" | "assistant" | "system";
  content: string;
}

export interface AIResponse {
  content: string;
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
  model: string;
}

export interface GenerateOptions {
  maxTokens?: number;
  temperature?: number;
  stream?: boolean;
}

class AIService {
  async generateResponse(
    model: AIModel,
    messages: Message[],
    options: GenerateOptions = {},
  ): Promise<AIResponse> {
    try {
      switch (model.provider) {
        case "gemini":
          return await this.generateGeminiResponse(model, messages, options);
        case "openai":
          return await this.generateOpenAIResponse(model, messages, options);
        case "local":
          return await this.generateLocalResponse(model, messages, options);
        default:
          throw createError(`Unsupported provider: ${model.provider}`, 400);
      }
    } catch (error) {
      console.error("❌ AI Service Error:", error);
      throw error;
    }
  }

  private async generateGeminiResponse(
    model: AIModel,
    messages: Message[],
    options: GenerateOptions,
  ): Promise<AIResponse> {
    try {
      console.log("🤖 Generating Gemini response...");

      if (!model.apiKey) {
        throw createError("Gemini API key not configured", 400);
      }

      const genAI = new GoogleGenerativeAI(model.apiKey);
      const geminiModel = genAI.getGenerativeModel({ model: model.modelId });

      // Convert messages to Gemini format
      const prompt = messages
        .map((msg) => {
          if (msg.role === "system") {
            return `System: ${msg.content}`;
          } else if (msg.role === "user") {
            return `User: ${msg.content}`;
          } else if (msg.role === "assistant") {
            return `Assistant: ${msg.content}`;
          }
          return msg.content;
        })
        .join("\n\n");

      console.log(
        "📝 Sending prompt to Gemini:",
        prompt.substring(0, 100) + "...",
      );

      const result = await geminiModel.generateContent({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          maxOutputTokens: options.maxTokens || 1000,
          temperature: options.temperature || 0.7,
        },
      });

      const response = await result.response;
      const content = response.text();

      console.log(
        "✅ Gemini response received:",
        content.substring(0, 100) + "...",
      );

      return {
        content,
        usage: {
          promptTokens: result.response.usageMetadata?.promptTokenCount || 0,
          completionTokens:
            result.response.usageMetadata?.candidatesTokenCount || 0,
          totalTokens: result.response.usageMetadata?.totalTokenCount || 0,
        },
        model: model.modelId,
      };
    } catch (error) {
      console.error("❌ Gemini API error:", error);
      throw createError(
        `Gemini API error: ${error instanceof Error ? error.message : "Unknown error"}`,
        500,
      );
    }
  }

  private async generateOpenAIResponse(
    model: AIModel,
    messages: Message[],
    options: GenerateOptions,
  ): Promise<AIResponse> {
    // TODO: Implement OpenAI integration
    throw createError("OpenAI integration not yet implemented", 501);
  }

  private async generateLocalResponse(
    model: AIModel,
    messages: Message[],
    options: GenerateOptions,
  ): Promise<AIResponse> {
    // TODO: Implement local model integration
    throw createError("Local model integration not yet implemented", 501);
  }
}

export default new AIService();
