const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export const api = {
  // Chat endpoints
  conversations: {
    getAll: () => fetch(`${API_BASE_URL}/api/chat/conversations`),
    create: (data: { title?: string }) =>
      fetch(`${API_BASE_URL}/api/chat/conversations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    update: (id: string, data: { title: string }) =>
      fetch(`${API_BASE_URL}/api/chat/conversations/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    delete: (id: string) =>
      fetch(`${API_BASE_URL}/api/chat/conversations/${id}`, {
        method: "DELETE",
      }),
    getMessages: (id: string) =>
      fetch(`${API_BASE_URL}/api/chat/conversations/${id}/messages`),
    sendMessage: (id: string, data: { content: string; role?: string }) =>
      fetch(`${API_BASE_URL}/api/chat/conversations/${id}/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    getNodes: (id: string) =>
      fetch(`${API_BASE_URL}/api/chat/conversations/${id}/nodes`),
    createNode: (
      id: string,
      data: {
        title: string;
        parentNodeId?: string;
        messageId?: string;
        order?: number;
      },
    ) =>
      fetch(`${API_BASE_URL}/api/chat/conversations/${id}/nodes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
  },

  // Model endpoints
  models: {
    getAll: () => fetch(`${API_BASE_URL}/api/models`),
    create: (data: any) =>
      fetch(`${API_BASE_URL}/api/models`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    update: (id: string, data: any) =>
      fetch(`${API_BASE_URL}/api/models/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    delete: (id: string) =>
      fetch(`${API_BASE_URL}/api/models/${id}`, {
        method: "DELETE",
      }),
    test: (id: string) =>
      fetch(`${API_BASE_URL}/api/models/${id}/test`, {
        method: "POST",
      }),
  },

  // AI generation endpoint
  generate: (data: {
    conversationId: string;
    modelId: string;
    messages: any[];
  }) =>
    fetch(`${API_BASE_URL}/api/chat/generate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }),
};
