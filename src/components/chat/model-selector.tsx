"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Settings, Plus, Check } from "lucide-react";
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

interface ModelSelectorProps {
  models: AIModel[];
  selectedModel: string | null;
  onModelSelect: (modelId: string) => void;
}

const providerColors = {
  openai: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  gemini: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  local:
    "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
  custom: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300",
};

const ModelSelector = ({
  models,
  selectedModel,
  onModelSelect,
}: ModelSelectorProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Ensure models is always an array
  const modelsArray = Array.isArray(models) ? models : [];
  const selectedModelData = modelsArray.find((m) => m.id === selectedModel);
  const activeModels = modelsArray.filter((m) => m.isActive);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">AI Model</span>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <Settings className="h-4 w-4" />
        </Button>
      </div>

      {selectedModelData ? (
        <Card
          className="cursor-pointer hover:bg-accent transition-colors"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <CardContent className="p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-medium text-sm">
                  {selectedModelData.name}
                </span>
                <Badge
                  variant="secondary"
                  className={cn(
                    "text-xs",
                    providerColors[selectedModelData.provider],
                  )}
                >
                  {selectedModelData.provider}
                </Badge>
              </div>
              <Check className="h-4 w-4 text-primary" />
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {selectedModelData.modelId}
            </p>
          </CardContent>
        </Card>
      ) : (
        <Card
          className="cursor-pointer hover:bg-accent transition-colors border-dashed"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <CardContent className="p-3 text-center">
            <p className="text-sm text-muted-foreground">No model selected</p>
          </CardContent>
        </Card>
      )}

      {isExpanded && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center justify-between">
              Select Model
              <Button variant="ghost" size="sm">
                <Plus className="h-4 w-4" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {activeModels.length === 0 ? (
              <div className="text-center text-muted-foreground py-4">
                <p className="text-sm">No models available</p>
                <p className="text-xs">Add a model to get started</p>
              </div>
            ) : (
              activeModels.map((model) => (
                <Card
                  key={model.id}
                  className={cn(
                    "cursor-pointer transition-colors hover:bg-accent",
                    selectedModel === model.id && "bg-accent border-primary",
                  )}
                  onClick={() => {
                    onModelSelect(model.id);
                    setIsExpanded(false);
                  }}
                >
                  <CardContent className="p-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-sm">
                          {model.name}
                        </span>
                        <Badge
                          variant="secondary"
                          className={cn(
                            "text-xs",
                            providerColors[model.provider],
                          )}
                        >
                          {model.provider}
                        </Badge>
                      </div>
                      {selectedModel === model.id && (
                        <Check className="h-4 w-4 text-primary" />
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {model.modelId}
                    </p>
                  </CardContent>
                </Card>
              ))
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ModelSelector;
