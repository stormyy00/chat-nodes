"use client";

import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Settings, MessageSquare } from "lucide-react";
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
} from "@/components/ui/sidebar";
import ConversationList from "./conversation-list";
import ChatMessages from "./chat-messages";
import MessageInput from "./message-input";
import ModelSelector from "./model-selector";
import ModelManagement from "./model-management";
import { api } from "@/utils/api";

interface Conversation {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
}

interface Message {
  id: string;
  conversationId: string;
  content: string;
  role: "user" | "assistant" | "system";
  timestamp: string;
  metadata?: any;
}

interface AIModel {
  id: string;
  name: string;
  provider: "openai" | "gemini" | "local" | "custom";
  modelId: string;
  apiKey?: string;
  baseUrl?: string;
  isActive: boolean;
  config?: any;
  createdAt: string;
}

const ChatInference = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversation, setActiveConversation] = useState<string | null>(
    null,
  );
  const [messages, setMessages] = useState<Message[]>([]);
  const [models, setModels] = useState<AIModel[]>([]);
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchConversations();
    fetchModels();
  }, []);

  useEffect(() => {
    if (activeConversation) {
      fetchMessages(activeConversation);
    }
  }, [activeConversation]);

  const fetchConversations = async () => {
    try {
      const response = await api.conversations.getAll();
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      const conversationsArray = Array.isArray(data) ? data : [];
      setConversations(conversationsArray);
      if (conversationsArray.length > 0 && !activeConversation)
        setActiveConversation(conversationsArray[0].id);
    } catch (error) {
      console.error("Error fetching conversations:", error);
      setConversations([]);
    }
  };

  const fetchMessages = async (conversationId: string) => {
    try {
      const response = await api.conversations.getMessages(conversationId);
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      const messagesArray = Array.isArray(data) ? data : [];
      setMessages(messagesArray);
    } catch (error) {
      console.error("Error fetching messages:", error);
      setMessages([]);
    }
  };

  const fetchModels = async () => {
    try {
      const response = await api.models.getAll();
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      const modelsArray = Array.isArray(data) ? data : [];
      setModels(modelsArray);
      const activeModel = modelsArray.find((model: AIModel) => model.isActive);
      if (activeModel) setSelectedModel(activeModel.id);
    } catch (error) {
      console.error("Error fetching models:", error);
      setModels([]);
    }
  };

  const createNewConversation = async () => {
    try {
      const response = await api.conversations.create({
        title: "New Conversation",
      });
      const newConversation = await response.json();
      setConversations((prev) => [newConversation, ...prev]);
      setActiveConversation(newConversation.id);
      setMessages([]);
    } catch (error) {
      console.error("Error creating conversation:", error);
    }
  };

  const sendMessage = async (content: string) => {
    if (!activeConversation || !selectedModel || !content.trim()) return;
    setIsLoading(true);
    try {
      const userMessage = await api.conversations.sendMessage(
        activeConversation,
        { content, role: "user" },
      );
      if (!userMessage.ok)
        throw new Error(`Failed to send message: ${userMessage.status}`);
      const userMsg = await userMessage.json();
      setMessages((prev) => [...prev, userMsg]);

      const selectedModelData = models.find((m) => m.id === selectedModel);
      if (selectedModelData) {
        const response = await api.generate({
          conversationId: activeConversation,
          modelId: selectedModel,
          messages: [...messages, userMsg],
        });
        if (response.ok) {
          const aiResponse = await response.json();
          setMessages((prev) => [...prev, aiResponse]);
        } else {
          console.error("Failed to generate AI response:", response.status);
        }
      }
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteConversation = async (id: string) => {
    try {
      const response = await api.conversations.delete(id);
      if (response.ok) {
        setConversations((prev) => prev.filter((c) => c.id !== id));
        if (activeConversation === id) {
          setActiveConversation(null);
          setMessages([]);
        }
      } else {
        console.error("Failed to delete conversation:", response.status);
      }
    } catch (error) {
      console.error("Error deleting conversation:", error);
    }
  };

  const handleEditConversation = async (id: string, newTitle: string) => {
    try {
      const response = await api.conversations.update(id, { title: newTitle });
      if (response.ok) {
        const updatedConversation = await response.json();
        setConversations((prev) =>
          prev.map((c) => (c.id === id ? updatedConversation : c)),
        );
      } else {
        console.error("Failed to update conversation:", response.status);
      }
    } catch (error) {
      console.error("Error updating conversation:", error);
    }
  };

  const handleAddModel = async (model: Omit<AIModel, "id" | "createdAt">) => {
    try {
      const response = await api.models.create(model);
      if (response.ok) {
        const newModel = await response.json();
        setModels((prev) => [...prev, newModel]);
      }
    } catch (error) {
      console.error("Error adding model:", error);
    }
  };

  const handleUpdateModel = async (id: string, updates: Partial<AIModel>) => {
    try {
      const response = await api.models.update(id, updates);
      if (response.ok) {
        const updatedModel = await response.json();
        setModels((prev) => prev.map((m) => (m.id === id ? updatedModel : m)));
      }
    } catch (error) {
      console.error("Error updating model:", error);
    }
  };

  const handleDeleteModel = async (id: string) => {
    try {
      const response = await api.models.delete(id);
      if (response.ok) {
        setModels((prev) => prev.filter((m) => m.id !== id));
        if (selectedModel === id) setSelectedModel(null);
      }
    } catch (error) {
      console.error("Error deleting model:", error);
    }
  };

  const handleTestModel = async (id: string) => {
    try {
      const response = await api.models.test(id);
      if (response.ok) {
        const result = await response.json();
        console.log("Model test result:", result);
      }
    } catch (error) {
      console.error("Error testing model:", error);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gpt-bg text-gpt-text w-full">
      {/* Sidebar */}
      <Sidebar>
        <SidebarHeader className="bg-gpt-panel/90 text-gpt-text">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-bold flex items-center gap-2">
              <MessageSquare className="h-6 w-6" />
              Chat Nodes
            </h1>
            <Button
              variant="outline"
              size="icon"
              onClick={createNewConversation}
              className="bg-gpt-accent/20 border-gpt-accent/40 text-gpt-text hover:bg-gpt-accent/30"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <ModelSelector
            models={models}
            selectedModel={selectedModel}
            onModelSelect={setSelectedModel}
          />
        </SidebarHeader>
        <SidebarContent>
          <ConversationList
            conversations={conversations}
            activeConversation={activeConversation}
            onConversationSelect={setActiveConversation}
            onDeleteConversation={handleDeleteConversation}
            onEditConversation={handleEditConversation}
          />
        </SidebarContent>
      </Sidebar>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-gpt-bg/70 backdrop-blur-sm min-h-0">
        <Tabs defaultValue="chat" className="flex-1 flex flex-col">
          <div className="border-b border-gpt-panel bg-gpt-panel/40 backdrop-blur-sm sticky top-0 z-10">
            <TabsList className="grid w-full grid-cols-2 bg-transparent text-gpt-text">
              <TabsTrigger
                value="chat"
                className="data-[state=active]:bg-gpt-accent data-[state=active]:text-gpt-text"
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                Chat
              </TabsTrigger>
              <TabsTrigger
                value="models"
                className="data-[state=active]:bg-gpt-accent data-[state=active]:text-gpt-text"
              >
                <Settings className="h-4 w-4 mr-2" />
                AI Models
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent
            value="chat"
            className="flex-1 flex flex-col m-0 min-h-0"
          >
            {activeConversation ? (
              <>
                <div className="p-4 border-b border-gpt-panel bg-gpt-panel/30 backdrop-blur-sm sticky top-[41px] z-10">
                  <h2 className="text-lg font-semibold">
                    {
                      conversations.find((c) => c.id === activeConversation)
                        ?.title
                    }
                  </h2>
                </div>

                <div className="flex-1 min-h-0 flex flex-col">
                  <ChatMessages messages={messages} isLoading={isLoading} />
                </div>

                <div className="p-4 border-t border-gpt-panel bg-gpt-panel/30 backdrop-blur-sm">
                  <MessageInput
                    onSendMessage={sendMessage}
                    disabled={isLoading}
                  />
                </div>
              </>
            ) : (
              <div className="flex flex-1 h-full items-center justify-center">
                <Card className="w-96 shadow-lg border-0 bg-gpt-panel/60 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MessageSquare className="h-5 w-5 text-gpt-accent" />
                      Welcome to Chat Nodes
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gpt-textSecondary mb-4">
                      Create a new conversation to get started with your AI
                      assistant.
                    </p>
                    <Button
                      onClick={createNewConversation}
                      className="w-full bg-gpt-accent hover:bg-gpt-accent/80 text-gpt-text"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      New Conversation
                    </Button>
                  </CardContent>
                </Card>
              </div>
            )}
          </TabsContent>

          <TabsContent value="models" className="flex-1 m-0 p-4">
            <ModelManagement
              models={models}
              onAddModel={handleAddModel}
              onUpdateModel={handleUpdateModel}
              onDeleteModel={handleDeleteModel}
              onTestModel={handleTestModel}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ChatInference;
