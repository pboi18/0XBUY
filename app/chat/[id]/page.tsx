"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Send,
  ChevronLeft,
  Paperclip,
  ImageIcon,
  MapPin,
  DollarSign,
  Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ThemeToggle } from "../../components/theme-toggle";

// Sample chat data
const chatData = {
  id: "chat-123",
  seller: {
    id: "seller-456",
    name: "CameraCollector",
    avatar: "/placeholder.svg?height=40&width=40",
    responseTime: "Usually responds within 1 hour",
  },
  product: {
    id: "product-789",
    title: "Vintage Film Camera",
    price: 149.99,
    image: "/placeholder.svg?height=100&width=100",
  },
  messages: [
    {
      id: 1,
      sender: "seller",
      text: "Hi there! Thanks for your interest in the vintage camera. Let me know if you have any questions.",
      timestamp: "2023-03-15T10:30:00",
    },
    {
      id: 2,
      sender: "user",
      text: "Hello! I'm interested in the camera. Does it come with the original case?",
      timestamp: "2023-03-15T10:35:00",
    },
    {
      id: 3,
      sender: "seller",
      text: "Yes, it comes with the original leather case and strap. Both are in good condition with some normal wear from age.",
      timestamp: "2023-03-15T10:38:00",
    },
    {
      id: 4,
      sender: "user",
      text: "Great! And has it been tested recently? Does everything work properly?",
      timestamp: "2023-03-15T10:42:00",
    },
    {
      id: 5,
      sender: "seller",
      text: "Yes, I've tested it with film last week. All mechanical parts work smoothly, the light meter is accurate, and the lens is clear with no fungus or scratches.",
      timestamp: "2023-03-15T10:45:00",
    },
    {
      id: 6,
      sender: "seller",
      text: "I can also include a roll of film if you'd like to test it yourself when you receive it.",
      timestamp: "2023-03-15T10:46:00",
    },
    {
      id: 7,
      sender: "user",
      text: "That would be great! Would you be willing to come down on the price a bit? How about $130?",
      timestamp: "2023-03-15T10:50:00",
    },
    {
      id: 8,
      sender: "seller",
      text: "I can meet you in the middle at $140. These cameras in this condition are getting harder to find.",
      timestamp: "2023-03-15T10:55:00",
    },
  ],
};

export default function ChatPage() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState(chatData.messages);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // TODO: Implement chat data fetching from Firebase

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const handleSendMessage = () => {
    if (message.trim() === "") return;

    const newMessage = {
      id: messages.length + 1,
      sender: "user",
      text: message,
      timestamp: new Date().toISOString(),
    };

    setMessages([...messages, newMessage]);
    setMessage("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col h-screen animate-fade-in">
      {/* Chat Header */}
      <header className="border-b p-4">
        <div className="container flex items-center gap-4">
          <Link
            href="/search"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            <ChevronLeft className="h-5 w-5" />
          </Link>
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage
                src={chatData.seller.avatar}
                alt={chatData.seller.name}
              />
              <AvatarFallback>{chatData.seller.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="font-medium">{chatData.seller.name}</h2>
              <p className="text-xs text-muted-foreground">
                {chatData.seller.responseTime}
              </p>
            </div>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <ThemeToggle />
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="transition-all hover:bg-primary hover:text-primary-foreground"
                >
                  View Item
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Item Details</SheetTitle>
                  <SheetDescription>
                    You&apos;re discussing this item
                  </SheetDescription>
                </SheetHeader>
                <div className="py-4">
                  <div className="rounded-lg border overflow-hidden">
                    <div className="relative h-48 w-full bg-muted">
                      <Image
                        src={chatData.product.image || "/placeholder.svg"}
                        alt={chatData.product.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium">{chatData.product.title}</h3>
                      <p className="text-xl font-bold mt-2">
                        ${chatData.product.price.toFixed(2)}
                      </p>
                      <div className="mt-4 space-y-2">
                        <Button
                          variant="outline"
                          className="w-full gap-2 transition-all hover:bg-primary hover:text-primary-foreground"
                        >
                          <DollarSign className="h-4 w-4" />
                          Make Offer
                        </Button>
                        <Button className="w-full gap-2 transition-transform hover:scale-105">
                          <Calendar className="h-4 w-4" />
                          Arrange Meetup
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <div className="rounded-lg border p-3 bg-muted/50 text-center text-sm text-muted-foreground mx-auto max-w-md">
          <p>
            You started chatting about{" "}
            <Link
              href={`/product/${chatData.product.id}`}
              className="font-medium text-primary hover:underline"
            >
              {chatData.product.title}
            </Link>
          </p>
          <p className="text-xs">March 15, 2023</p>
        </div>

        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] md:max-w-[60%] ${
                msg.sender === "user"
                  ? "bg-primary text-primary-foreground rounded-t-lg rounded-l-lg"
                  : "bg-muted rounded-t-lg rounded-r-lg"
              } p-3 relative`}
            >
              <p>{msg.text}</p>
              <span className="text-xs opacity-70 block text-right mt-1">
                {formatTimestamp(msg.timestamp)}
              </span>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Chat Input */}
      <div className="border-t p-4">
        <div className="container">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              <Paperclip className="h-4 w-4" />
              <span className="sr-only">Attach file</span>
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              <ImageIcon className="h-4 w-4" />
              <span className="sr-only">Attach image</span>
            </Button>
            <div className="relative flex-1">
              <Input
                placeholder="Type a message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                className="pr-10 transition-all focus:ring-2 focus:ring-primary/50"
              />
              <Button
                size="icon"
                className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 transition-transform hover:scale-110"
                onClick={handleSendMessage}
                disabled={message.trim() === ""}
              >
                <Send className="h-3 w-3" />
                <span className="sr-only">Send message</span>
              </Button>
            </div>
          </div>
          <div className="flex justify-center mt-4">
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="gap-1 transition-all hover:bg-primary hover:text-primary-foreground"
              >
                <DollarSign className="h-3 w-3" />
                Make Offer
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="gap-1 transition-all hover:bg-primary hover:text-primary-foreground"
              >
                <MapPin className="h-3 w-3" />
                Share Location
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="gap-1 transition-all hover:bg-primary hover:text-primary-foreground"
              >
                <Calendar className="h-3 w-3" />
                Schedule Meetup
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
