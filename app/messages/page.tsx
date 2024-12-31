"use client"

import { useState } from 'react'
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Send } from "lucide-react"

export default function MessagesPage() {
  const [selectedChat, setSelectedChat] = useState<string | null>(null)

  return (
    <div className="container py-8">
      <div className="grid md:grid-cols-[300px_1fr] gap-8 h-[calc(100vh-12rem)]">
        {/* Chats List */}
        <Card className="p-4">
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search conversations..." className="pl-9" />
            </div>
            
            <ScrollArea className="h-[calc(100vh-16rem)]">
              <div className="space-y-2">
                {[1, 2, 3].map((chat) => (
                  <div
                    key={chat}
                    className={`p-3 rounded-lg cursor-pointer hover:bg-accent ${
                      selectedChat === `chat-${chat}` ? 'bg-accent' : ''
                    }`}
                    onClick={() => setSelectedChat(`chat-${chat}`)}
                  >
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarImage src={`https://avatar.vercel.sh/${chat}.png`} />
                        <AvatarFallback>SC</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">Scrap Trader {chat}</div>
                        <div className="text-sm text-muted-foreground">Last message preview...</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        </Card>

        {/* Chat Window */}
        <Card className="p-4 flex flex-col">
          {selectedChat ? (
            <>
              {/* Chat Header */}
              <div className="pb-4 border-b">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage src={`https://avatar.vercel.sh/${selectedChat}.png`} />
                    <AvatarFallback>SC</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">Scrap Trader</div>
                    <div className="text-sm text-muted-foreground">Online</div>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {[1, 2, 3].map((message) => (
                    <div
                      key={message}
                      className={`flex ${message % 2 === 0 ? 'justify-end' : ''}`}
                    >
                      <div
                        className={`max-w-[70%] p-3 rounded-lg ${
                          message % 2 === 0
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted'
                        }`}
                      >
                        <p>This is a sample message in the conversation.</p>
                        <div className="text-xs mt-1 opacity-70">
                          {new Date().toLocaleTimeString()}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              {/* Message Input */}
              <div className="pt-4 border-t mt-auto">
                <div className="flex space-x-2">
                  <Input placeholder="Type your message..." />
                  <Button size="icon">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="h-full flex items-center justify-center text-muted-foreground">
              Select a conversation to start messaging
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}