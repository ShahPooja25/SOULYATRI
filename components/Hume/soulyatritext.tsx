"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

type Message = {
  id: number;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
  reactions: {
    thumbsUp: number;
    neutral: number;
    thumbsDown: number;
  };
};

type SoulYatriBotProps = {
  onClose: () => void;
};

const fetchGeminiResponse = async (prompt: string): Promise<string> => {
  const res = await fetch("/api/gemini", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt }),
  });

  if (!res.ok) {
    console.error("Gemini API error");
    return "Sorry, I couldn’t process that. Please try again.";
  }

  const data = await res.json();
  return data.response || "Sorry, I didn't understand that.";
};

const SoulYatriBot = ({ onClose }: SoulYatriBotProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputText,
      sender: "user",
      timestamp: new Date(),
      reactions: { thumbsUp: 90, neutral: 5, thumbsDown: 5 },
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText("");

    const botText = await fetchGeminiResponse(inputText);

    const botMessage: Message = {
      id: messages.length + 2,
      text: botText,
      sender: "bot",
      timestamp: new Date(),
      reactions: { thumbsUp: 90, neutral: 5, thumbsDown: 5 },
    };

    setMessages((prev) => [...prev, botMessage]);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSendMessage();
  };

  return (
    <div className="p-4 flex flex-col h-full">
      <div className="flex-1 overflow-y-auto space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`text-sm ${msg.sender === "user" ? "text-right" : "text-left"}`}
          >
            <div
              className={`inline-block px-4 py-2 rounded-lg ${
                msg.sender === "user" ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="mt-4 flex items-center gap-2">
        <Input
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ask something..."
        />
        <Button onClick={handleSendMessage}>Send</Button>
      </div>
    </div>
  );
};

export default SoulYatriBot;
