
"use client";

import type { Conversation, UserSummary } from "@/lib/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from 'date-fns';
import { mockUsers } from "@/lib/mock-data"; // For current user context

interface ConversationListItemProps {
  conversation: Conversation;
  isSelected: boolean;
  onSelect: () => void;
  currentUserId: string; // To determine the other participant for display
}

export function ConversationListItem({ conversation, isSelected, onSelect, currentUserId }: ConversationListItemProps) {
  const otherParticipant = conversation.participants.find(p => p.id !== currentUserId);
  const displayUser = otherParticipant || conversation.participants[0] || { name: "Unknown", avatarUrl: "" }; // Fallback

  const lastMessageText = conversation.lastMessage?.text || "No messages yet.";
  const lastMessageTimestamp = conversation.lastMessage?.timestamp 
    ? formatDistanceToNow(new Date(conversation.lastMessage.timestamp), { addSuffix: true })
    : "";

  return (
    <button
      onClick={onSelect}
      className={cn(
        "flex w-full items-center gap-3 p-3 text-left hover:bg-muted/50 rounded-lg transition-colors",
        isSelected && "bg-muted"
      )}
    >
      <Avatar className="h-10 w-10 border">
        <AvatarImage src={displayUser.avatarUrl} alt={displayUser.name} data-ai-hint="person avatar" />
        <AvatarFallback>{displayUser.name.substring(0, 1).toUpperCase()}</AvatarFallback>
      </Avatar>
      <div className="flex-1 overflow-hidden">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-sm truncate">{conversation.title || displayUser.name}</h3>
          {lastMessageTimestamp && <p className="text-xs text-muted-foreground whitespace-nowrap">{lastMessageTimestamp}</p>}
        </div>
        <div className="flex justify-between items-center">
          <p className="text-xs text-muted-foreground truncate">{lastMessageText}</p>
          {conversation.unreadCount && conversation.unreadCount > 0 && (
            <Badge variant="default" className="h-5 px-2 text-xs">
              {conversation.unreadCount}
            </Badge>
          )}
        </div>
      </div>
    </button>
  );
}
