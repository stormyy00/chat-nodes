"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageSquare, Trash2, Edit2, MoreVertical } from "lucide-react";
import { cn } from "@/utils/utils";
import { useState } from "react";

interface Conversation {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
}

interface ConversationListProps {
  conversations: Conversation[];
  activeConversation: string | null;
  onConversationSelect: (id: string) => void;
  onDeleteConversation?: (id: string) => void;
  onEditConversation?: (id: string, newTitle: string) => void;
}

const ConversationList = ({
  conversations,
  activeConversation,
  onConversationSelect,
  onDeleteConversation,
  onEditConversation,
}: ConversationListProps) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");

  // Sort conversations by updatedAt (most recent first)
  const sortedConversations = [...conversations].sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
  );

  const handleEditStart = (conversation: Conversation) => {
    setEditingId(conversation.id);
    setEditTitle(conversation.title);
  };

  const handleEditSave = () => {
    if (editingId && editTitle.trim() && onEditConversation) {
      onEditConversation(editingId, editTitle.trim());
    }
    setEditingId(null);
    setEditTitle("");
  };

  const handleEditCancel = () => {
    setEditingId(null);
    setEditTitle("");
  };
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 24) {
      return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    } else if (diffInHours < 168) {
      // 7 days
      return date.toLocaleDateString([], { weekday: "short" });
    } else {
      return date.toLocaleDateString([], { month: "short", day: "numeric" });
    }
  };

  return (
    <ScrollArea className="flex-1 p-3">
      <div className="space-y-1.5">
        {sortedConversations.length === 0 ? (
          <div className="text-center text-muted-foreground py-8">
            <MessageSquare className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p>No conversations yet</p>
            <p className="text-sm">
              Create your first conversation to get started
            </p>
          </div>
        ) : (
          sortedConversations.map(
            ({ id, title, updatedAt, isActive }, index) => (
              <Card
                key={index}
                className={cn(
                  "cursor-pointer transition-all duration-200 hover:shadow-md group",
                  activeConversation === id
                    ? "bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-400 shadow-sm"
                    : "hover:bg-gradient-to-r hover:from-gray-50 hover:to-slate-50 border",
                )}
                onClick={() => onConversationSelect(id)}
              >
                <CardContent className="p-2.5">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      {editingId === id ? (
                        <div className="space-y-2">
                          <input
                            type="text"
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                            className="w-full px-2 py-1 text-[13px] border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            autoFocus
                            onKeyDown={(e) => {
                              if (e.key === "Enter") handleEditSave();
                              if (e.key === "Escape") handleEditCancel();
                            }}
                          />
                          <div className="flex gap-1">
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-6 px-2 text-xs"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleEditSave();
                              }}
                            >
                              Save
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-6 px-2 text-xs"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleEditCancel();
                              }}
                            >
                              Cancel
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <h3 className="font-semibold text-[13px] truncate text-gray-900 leading-tight">
                            {title}
                          </h3>
                          <p className="text-[11px] text-gray-500 mt-0.5">
                            {formatDate(updatedAt)}
                          </p>
                        </>
                      )}
                    </div>
                    {editingId !== id && (
                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 hover:bg-blue-100"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditStart({ id, title, updatedAt, isActive });
                          }}
                        >
                          <Edit2 className="h-3 w-3 text-blue-600" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 hover:bg-red-100"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (onDeleteConversation) {
                              onDeleteConversation(id);
                            }
                          }}
                        >
                          <Trash2 className="h-3 w-3 text-red-600" />
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ),
          )
        )}
      </div>
    </ScrollArea>
  );
};

export default ConversationList;
