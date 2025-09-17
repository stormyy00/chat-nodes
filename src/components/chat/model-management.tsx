"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Plus,
  Settings,
  Trash2,
  Edit2,
  TestTube,
  Key,
  Globe,
  Bot,
  CheckCircle,
  XCircle,
  Eye,
  EyeOff,
} from "lucide-react";
import { cn } from "@/utils/utils";

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

interface ModelManagementProps {
  models: AIModel[];
  onAddModel?: (model: Omit<AIModel, "id" | "createdAt">) => void;
  onUpdateModel?: (id: string, model: Partial<AIModel>) => void;
  onDeleteModel?: (id: string) => void;
  onTestModel?: (id: string) => void;
}

const providerColors = {
  openai: "bg-[#E8F5E9] text-[#1B5E20] border-[#C8E6C9]",
  gemini: "bg-[#EDE7F6] text-[#4527A0] border-[#D1C4E9]",
  local: "bg-[#F3E5F5] text-[#4A148C] border-[#E1BEE7]",
  custom: "bg-[#FFF3E0] text-[#E65100] border-[#FFE0B2]",
};

const providerIcons = {
  openai: "🤖",
  gemini: "💎",
  local: "🏠",
  custom: "⚙️",
};

const ModelManagement = ({
  models,
  onAddModel,
  onUpdateModel,
  onDeleteModel,
  onTestModel,
}: ModelManagementProps) => {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [showAddApiKey, setShowAddApiKey] = useState(false);
  const [showEditApiKey, setShowEditApiKey] = useState(false);
  const [addForm, setAddForm] = useState({
    name: "",
    provider: "gemini" as const,
    modelId: "",
    apiKey: "",
    baseUrl: "",
    isActive: true,
  });
  const [editForm, setEditForm] = useState({
    name: "",
    provider: "gemini" as const,
    modelId: "",
    apiKey: "",
    baseUrl: "",
    isActive: true,
  });
  const [addError, setAddError] = useState<string>("");

  const handleAddModel = () => {
    setAddError("");
    if (!addForm.name || !addForm.modelId || !onAddModel) return;
    // Prevent simple duplicates client-side
    const dup = models.some(
      (m) =>
        m.provider === addForm.provider &&
        m.modelId.trim() === addForm.modelId.trim(),
    );
    if (dup) {
      setAddError(
        "A model with the same provider and model id already exists.",
      );
      return;
    }
    onAddModel(addForm);
    setAddForm({
      name: "",
      provider: "gemini",
      modelId: "",
      apiKey: "",
      baseUrl: "",
      isActive: true,
    });
    setIsAdding(false);
  };

  const handleEditModel = (model: AIModel) => {
    setEditingId(model.id);
    setEditForm({
      name: model.name,
      provider: model.provider,
      modelId: model.modelId,
      apiKey: model.apiKey || "",
      baseUrl: model.baseUrl || "",
      isActive: model.isActive,
    });
    setIsEditOpen(true);
    setShowEditApiKey(false);
  };

  const handleUpdateModel = () => {
    if (editingId && onUpdateModel) {
      onUpdateModel(editingId, editForm);
      setEditingId(null);
      setEditForm({
        name: "",
        provider: "gemini",
        modelId: "",
        apiKey: "",
        baseUrl: "",
        isActive: true,
      });
      setIsEditOpen(false);
    }
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Settings className="h-5 w-5 text-gpt-accent" />
            AI Models
          </CardTitle>
          <Button
            size="sm"
            onClick={() => setIsAdding(true)}
            className="bg-gpt-accent hover:bg-gpt-accent/80 text-gpt-text"
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Model
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[400px] px-4">
          <div className="space-y-3 pb-4">
            {isAdding && (
              <Card className="border-2 border-dashed border-gpt-accent/50 bg-gpt-accent/10">
                <CardContent className="p-4">
                  <h4 className="font-medium mb-3">Add New Model</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        Name
                      </label>
                      <Input
                        placeholder="e.g., Gemini 2.0 Flash"
                        value={addForm.name}
                        onChange={(e) =>
                          setAddForm({ ...addForm, name: e.target.value })
                        }
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        Provider
                      </label>
                      <select
                        value={addForm.provider}
                        onChange={(e) =>
                          setAddForm({
                            ...addForm,
                            provider: e.target.value as any,
                          })
                        }
                        className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gpt-accent"
                      >
                        <option value="gemini">Gemini</option>
                        <option value="openai">OpenAI</option>
                        <option value="local">Local</option>
                        <option value="custom">Custom</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        Model ID
                      </label>
                      <Input
                        placeholder="e.g., gemini-2.0-flash"
                        value={addForm.modelId}
                        onChange={(e) =>
                          setAddForm({ ...addForm, modelId: e.target.value })
                        }
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        API Key
                      </label>
                      <div className="relative mt-1">
                        <Input
                          type={showAddApiKey ? "text" : "password"}
                          placeholder="Your API key"
                          value={addForm.apiKey}
                          onChange={(e) =>
                            setAddForm({ ...addForm, apiKey: e.target.value })
                          }
                          className="pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowAddApiKey((s) => !s)}
                          className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                          aria-label={
                            showAddApiKey ? "Hide API key" : "Show API key"
                          }
                        >
                          {showAddApiKey ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </div>
                    {addForm.provider === "local" && (
                      <>
                        <label className="text-sm font-medium text-gray-700">
                          Base URL
                        </label>
                        <Input
                          placeholder="http://localhost:11434"
                          value={addForm.baseUrl}
                          onChange={(e) =>
                            setAddForm({ ...addForm, baseUrl: e.target.value })
                          }
                          className="mt-1"
                        />
                      </>
                    )}
                    {addError && (
                      <p className="text-xs text-red-600">{addError}</p>
                    )}
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={handleAddModel}
                        className="bg-gpt-accent hover:bg-gpt-accent/80 text-gpt-text"
                      >
                        Add Model
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setIsAdding(false)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {models.map((model) => (
              <Card
                key={model.id}
                className={cn(
                  "transition-all duration-200 hover:shadow-md",
                  model.isActive
                    ? "border-gpt-accent/40 bg-gpt-accent/10"
                    : "border-gray-200 bg-gray-50/30",
                )}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-lg">
                          {providerIcons[model.provider]}
                        </span>
                        <h3 className="font-medium truncate">{model.name}</h3>
                        <Badge
                          className={cn(
                            "text-xs",
                            providerColors[model.provider],
                          )}
                        >
                          {model.provider}
                        </Badge>
                        {model.isActive ? (
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        ) : (
                          <XCircle className="h-4 w-4 text-gray-400" />
                        )}
                      </div>
                      <div className="space-y-1 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Bot className="h-3 w-3" />
                          <span className="font-mono text-xs">
                            {model.modelId}
                          </span>
                        </div>
                        {model.apiKey && (
                          <div className="flex items-center gap-1">
                            <Key className="h-3 w-3" />
                            <span className="text-xs">
                              API Key: {model.apiKey.substring(0, 8)}...
                            </span>
                          </div>
                        )}
                        {model.baseUrl && (
                          <div className="flex items-center gap-1">
                            <Globe className="h-3 w-3" />
                            <span className="text-xs truncate">
                              {model.baseUrl}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-1 ml-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 hover:bg-gpt-accent/20"
                        onClick={() => onTestModel?.(model.id)}
                        title="Test Model"
                      >
                        <TestTube className="h-4 w-4 text-gpt-accent" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 hover:bg-gpt-accent/20"
                        onClick={() => handleEditModel(model)}
                        title="Edit Model"
                      >
                        <Edit2 className="h-4 w-4 text-gpt-accent" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 hover:bg-red-100"
                        onClick={() => onDeleteModel?.(model.id)}
                        title="Delete Model"
                      >
                        <Trash2 className="h-4 w-4 text-red-600" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {models.length === 0 && !isAdding && (
              <div className="text-center py-8 text-gray-500">
                <Bot className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>No AI models configured</p>
                <p className="text-sm">Add your first model to get started</p>
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
      {/* Edit Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Model</DialogTitle>
            <DialogDescription>
              Update model settings and API key.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium text-gray-700">Name</label>
              <Input
                placeholder="Model name"
                value={editForm.name}
                onChange={(e) =>
                  setEditForm({ ...editForm, name: e.target.value })
                }
                className="mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">
                Provider
              </label>
              <select
                value={editForm.provider}
                onChange={(e) =>
                  setEditForm({ ...editForm, provider: e.target.value as any })
                }
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gpt-accent"
              >
                <option value="gemini">Gemini</option>
                <option value="openai">OpenAI</option>
                <option value="local">Local</option>
                <option value="custom">Custom</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">
                Model ID
              </label>
              <Input
                placeholder="e.g., gemini-2.0-flash"
                value={editForm.modelId}
                onChange={(e) =>
                  setEditForm({ ...editForm, modelId: e.target.value })
                }
                className="mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">
                API Key
              </label>
              <div className="relative mt-1">
                <Input
                  type={showEditApiKey ? "text" : "password"}
                  placeholder="Your API key"
                  value={editForm.apiKey}
                  onChange={(e) =>
                    setEditForm({ ...editForm, apiKey: e.target.value })
                  }
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowEditApiKey((s) => !s)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  aria-label={showEditApiKey ? "Hide API key" : "Show API key"}
                >
                  {showEditApiKey ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
            {editForm.provider === "local" && (
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Base URL
                </label>
                <Input
                  placeholder="http://localhost:11434"
                  value={editForm.baseUrl}
                  onChange={(e) =>
                    setEditForm({ ...editForm, baseUrl: e.target.value })
                  }
                  className="mt-1"
                />
              </div>
            )}
          </div>
          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setIsEditOpen(false)}>
              Cancel
            </Button>
            <Button
              className="bg-gpt-accent hover:bg-gpt-accent/80 text-gpt-text"
              onClick={handleUpdateModel}
            >
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default ModelManagement;
