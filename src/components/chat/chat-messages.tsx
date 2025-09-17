"use client";

import { useEffect, useRef } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import TextRenderer from "./text-renderer";
import { Bot, User, Loader2 } from "lucide-react";
import { cn } from "@/utils/utils";

interface Message {
  id: string;
  conversationId: string;
  content: string;
  role: "user" | "assistant" | "system";
  timestamp: string;
  metadata?: any;
}

interface ChatMessagesProps {
  messages: Message[];
  isLoading: boolean;
}

const ChatMessages = ({ messages, isLoading }: ChatMessagesProps) => {
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollElement = scrollAreaRef.current.querySelector(
        "[data-radix-scroll-area-viewport]",
      );
      if (scrollElement) {
        scrollElement.scrollTop = scrollElement.scrollHeight;
      }
    }
  }, [messages, isLoading]);

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <ScrollArea ref={scrollAreaRef} className="h-full">
      <div className="p-4 space-y-4 max-w-4xl mx-auto">
        {messages.length === 0 ? (
          <div className="text-center text-gpt-textSecondary py-12">
            <Bot className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-medium mb-2">Start a conversation</h3>
            <p>Send a message to begin chatting with your AI assistant.</p>
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex gap-3",
                message.role === "user" ? "justify-end" : "justify-start",
              )}
            >
              {message.role !== "user" && (
                <Avatar className="h-8 w-8 mt-1">
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    <Bot className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
              )}

              <div
                className={cn(
                  "max-w-[80%] space-y-1",
                  message.role === "user" ? "order-first" : "",
                )}
              >
                <Card
                  className={cn(
                    "p-3",
                    message.role === "user"
                      ? "bg-gpt-userBubble text-gpt-text border border-gpt-userBorder shadow-[0_1px_2px_rgba(0,0,0,0.05)]"
                      : "bg-gpt-botBubble text-gpt-text shadow-sm",
                  )}
                >
                  <CardContent className="p-0">
                    <div className="text-sm">
                      <TextRenderer text={message.content} />
                    </div>
                  </CardContent>
                </Card>
                <div
                  className={cn(
                    "text-xs text-gpt-textSecondary px-1",
                    message.role === "user" ? "text-right" : "text-left",
                  )}
                >
                  {formatTime(message.timestamp)}
                </div>
              </div>

              {message.role === "user" && (
                <Avatar className="h-8 w-8 mt-1">
                  <AvatarFallback className="bg-secondary text-secondary-foreground">
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
          ))
        )}

        {isLoading && (
          <div className="flex gap-3 justify-start">
            <Avatar className="h-8 w-8 mt-1">
              <AvatarFallback className="bg-primary text-primary-foreground">
                <Bot className="h-4 w-4" />
              </AvatarFallback>
            </Avatar>
            <div className="max-w-[80%]">
              <Card className="p-3 bg-gpt-botBubble">
                <CardContent className="p-0">
                  <div className="flex items-center gap-2 text-sm text-gpt-textSecondary">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    AI is thinking...
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </ScrollArea>
  );
};

export default ChatMessages;
