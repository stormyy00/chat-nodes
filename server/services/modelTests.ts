import { GoogleGenerativeAI } from "@google/generative-ai";
import { AIModel } from "../../server/db/schema";

export async function testGemini(
  model: AIModel,
): Promise<{ success: boolean; message: string }> {
  try {
    if (!model.apiKey) {
      return { success: false, message: "API key not configured" };
    }

    const genAI = new GoogleGenerativeAI(model.apiKey);
    const geminiModel = genAI.getGenerativeModel({ model: model.modelId });

    const result = await geminiModel.generateContent(
      "Hello, this is a test message.",
    );
    const response = await result.response;

    return { success: true, message: "Gemini connection successful" };
  } catch (error: any) {
    return { success: false, message: `Gemini test failed: ${error.message}` };
  }
}

export async function testOpenAI(
  model: AIModel,
): Promise<{ success: boolean; message: string }> {
  try {
    // TODO: Implement OpenAI test
    return { success: false, message: "OpenAI test not yet implemented" };
  } catch (error: any) {
    return { success: false, message: `OpenAI test failed: ${error.message}` };
  }
}

export async function testLocalModel(
  model: AIModel,
): Promise<{ success: boolean; message: string }> {
  try {
    if (!model.baseUrl) {
      return { success: false, message: "Base URL not configured" };
    }

    // For local models, we'll make a simple HTTP request to the baseUrl
    const response = await fetch(`${model.baseUrl}/v1/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${model.apiKey || "dummy"}`,
      },
      body: JSON.stringify({
        model: model.modelId,
        messages: [{ role: "user", content: "Hello, this is a test message." }],
        max_tokens: 10,
      }),
    });

    if (response.ok) {
      return { success: true, message: "Local model connection successful" };
    } else {
      return {
        success: false,
        message: `Local model test failed: ${response.statusText}`,
      };
    }
  } catch (error: any) {
    return {
      success: false,
      message: `Local model test failed: ${error.message}`,
    };
  }
}
