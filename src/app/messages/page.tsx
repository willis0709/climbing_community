
"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ConversationListItem } from "@/components/conversation-list-item";
import { Send, MessageSquare, Search, PlusCircle } from "lucide-react";
import type { Conversation, Message as MessageType, User, UserSummary } from "@/lib/types";
import { getConversationsForUser, getMessagesForConversation, mockUsers, mockMessagesByConversationId } from "@/lib/mock-data"; // Added mockMessagesByConversationId
import { format } from 'date-fns';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function MessagesPage() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isNewChatDialogOpen, setIsNewChatDialogOpen] = useState(false);

  useEffect(() => {
    const user = mockUsers[0]; 
    setCurrentUser(user);
    if (user) {
      const userConversations = getConversationsForUser(user.id);
      setConversations(userConversations);
    }
  }, []);

  useEffect(() => {
    if (selectedConversation) {
      const convMessages = getMessagesForConversation(selectedConversation.id);
      setMessages(convMessages);
    } else {
      setMessages([]);
    }
  }, [selectedConversation]);

  const handleSelectConversation = (conversation: Conversation) => {
    setSelectedConversation(conversation);
    const updatedConversations = conversations.map(c => 
      c.id === conversation.id ? { ...c, unreadCount: 0 } : c
    );
    setConversations(updatedConversations);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedConversation || !currentUser) return;

    const messageToSend: MessageType = {
      id: `msg-${Date.now()}`,
      conversationId: selectedConversation.id,
      senderId: currentUser.id,
      text: newMessage,
      timestamp: new Date().toISOString(),
      read: true, 
    };

    setMessages(prevMessages => [...prevMessages, messageToSend]);
    
    const updatedConversations = conversations.map(conv => {
      if (conv.id === selectedConversation.id) {
        return { ...conv, lastMessage: messageToSend };
      }
      return conv;
    }).sort((a, b) => new Date(b.lastMessage?.timestamp || 0).getTime() - new Date(a.lastMessage?.timestamp || 0).getTime());
    setConversations(updatedConversations);

    setNewMessage("");
  };
  
  const filteredConversations = conversations.filter(conv => 
    (conv.title || conv.participants.find(p => p.id !== currentUser?.id)?.name || "Conversation")
    .toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleStartNewConversation = (userToChat: User) => {
    if (!currentUser) return;

    const existingConversation = conversations.find(conv => 
      conv.participants.length === 2 && // Assuming 1-on-1 chats for this simple check
      conv.participants.some(p => p.id === currentUser.id) &&
      conv.participants.some(p => p.id === userToChat.id)
    );

    if (existingConversation) {
      setSelectedConversation(existingConversation);
    } else {
      const newConv: Conversation = {
        id: `conv-${Date.now()}`,
        participants: [
          { id: currentUser.id, name: currentUser.name, avatarUrl: currentUser.avatarUrl },
          { id: userToChat.id, name: userToChat.name, avatarUrl: userToChat.avatarUrl }
        ],
        lastMessage: undefined,
        unreadCount: 0,
        title: userToChat.name,
      };
      // Add to mockMessagesByConversationId as well so getMessagesForConversation can find it
      // This is a client-side mock, real backend would handle this.
      if (!(newConv.id in mockMessagesByConversationId)) {
        mockMessagesByConversationId[newConv.id] = [];
      }

      setConversations(prev => [newConv, ...prev].sort((a,b) => new Date(b.lastMessage?.timestamp || 0).getTime() - new Date(a.lastMessage?.timestamp || 0).getTime() ));
      setSelectedConversation(newConv);
    }
    setIsNewChatDialogOpen(false);
  };


  if (!currentUser) {
    return <div className="p-4">Loading user...</div>;
  }

  return (
    <div className="flex h-[calc(100vh-4rem)] border-t">
      <div className="w-1/3 border-r flex flex-col bg-muted/20">
        <div className="p-4 border-b">
          <h2 className="text-xl font-semibold flex items-center"><MessageSquare className="mr-2 h-6 w-6 text-primary" /> Messages</h2>
          <div className="relative mt-2">
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search conversations..." 
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
           <Button variant="outline" size="sm" onClick={() => setIsNewChatDialogOpen(true)} className="mt-3 w-full">
            <PlusCircle className="mr-2 h-4 w-4" />
            New Message
          </Button>
        </div>
        <ScrollArea className="flex-1 p-2 space-y-1">
          {filteredConversations.length > 0 ? (
            filteredConversations.map((conv) => (
              <ConversationListItem
                key={conv.id}
                conversation={conv}
                isSelected={selectedConversation?.id === conv.id}
                onSelect={() => handleSelectConversation(conv)}
                currentUserId={currentUser.id}
              />
            ))
          ) : (
            <p className="p-4 text-sm text-muted-foreground text-center">No conversations found.</p>
          )}
        </ScrollArea>
      </div>

      <div className="w-2/3 flex flex-col bg-background">
        {selectedConversation ? (
          <>
            <div className="p-4 border-b flex items-center gap-3">
              <Avatar className="h-10 w-10 border">
                 <AvatarImage src={selectedConversation.participants.find(p=>p.id !== currentUser.id)?.avatarUrl} alt={selectedConversation.title} />
                 <AvatarFallback>{selectedConversation.title?.substring(0,1).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold">{selectedConversation.title || selectedConversation.participants.find(p => p.id !== currentUser.id)?.name}</h3>
                <p className="text-xs text-muted-foreground">Online (mock status)</p>
              </div>
            </div>
            <ScrollArea className="flex-1 p-4 space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.senderId === currentUser.id ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-xs lg:max-w-md p-3 rounded-lg shadow ${
                      msg.senderId === currentUser.id 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-muted'
                    }`}
                  >
                    <p className="text-sm">{msg.text}</p>
                    <p className={`text-xs mt-1 ${
                        msg.senderId === currentUser.id ? 'text-primary-foreground/70 text-right' : 'text-muted-foreground/70 text-left'
                      }`}
                    >
                      {format(new Date(msg.timestamp), "p")}
                    </p>
                  </div>
                </div>
              ))}
            </ScrollArea>
            <form onSubmit={handleSendMessage} className="p-4 border-t bg-muted/50">
              <div className="flex items-center gap-2">
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1"
                  autoComplete="off"
                />
                <Button type="submit" size="icon" disabled={!newMessage.trim()}>
                  <Send className="h-5 w-5" />
                  <span className="sr-only">Send</span>
                </Button>
              </div>
            </form>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground">
            <MessageSquare className="h-16 w-16 mb-4" />
            <p className="text-lg">Select a conversation to start chatting</p>
            <p className="text-sm">or search for existing conversations, or start a new one.</p>
          </div>
        )}
      </div>

      <Dialog open={isNewChatDialogOpen} onOpenChange={setIsNewChatDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Start a new conversation</DialogTitle>
            <DialogDescription>Select a user to start chatting with.</DialogDescription>
          </DialogHeader>
          <ScrollArea className="max-h-[calc(100vh-20rem)] sm:max-h-[300px] mt-4 pr-3"> {/* Added pr-3 for scrollbar */}
            <div className="space-y-1">
              {mockUsers.filter(u => u.id !== currentUser?.id).map(userToChat => (
                <Button
                  key={userToChat.id}
                  variant="ghost"
                  className="w-full justify-start gap-3 p-2 h-auto"
                  onClick={() => handleStartNewConversation(userToChat)}
                >
                  <Avatar className="h-9 w-9 border">
                    <AvatarImage src={userToChat.avatarUrl} alt={userToChat.name} data-ai-hint="person avatar" />
                    <AvatarFallback>{userToChat.name.substring(0,1)}</AvatarFallback>
                  </Avatar>
                  <div className="text-left">
                    <p className="text-sm font-medium">{userToChat.name}</p>
                    <p className="text-xs text-muted-foreground">{userToChat.climbingExperience} Climber</p>
                  </div>
                </Button>
              ))}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>

    </div>
  );
}

