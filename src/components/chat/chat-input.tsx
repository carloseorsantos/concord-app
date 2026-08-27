"use client";

import { useState } from "react";
import axios from "axios";
import { Plus, Smile } from "lucide-react";

interface ChatInputProps {
  apiUrl: string;
  query: Record<string, any>;
  name: string;
  type: "conversation" | "channel";
}

export const ChatInput = ({ apiUrl, query, name }: ChatInputProps) => {
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() || isLoading) return;

    try {
      setIsLoading(true);
      const url = `${apiUrl}?${new URLSearchParams(query).toString()}`;
      await axios.post(url, { content });
      setContent("");
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="p-4 bg-[#313338] border-t border-[#2B2D31]">
      <div className="relative">
        <button
          type="button"
          className="absolute top-3 left-4 h-6 w-6 bg-zinc-500 hover:bg-zinc-400 transition rounded-full p-1 flex items-center justify-center"
        >
          <Plus className="text-[#313338]" />
        </button>
        <input
          disabled={isLoading}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={`Conversar em #${name}`}
          className="px-14 py-3 bg-[#383A40] border-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-zinc-200 text-sm rounded-lg w-full outline-none placeholder:text-zinc-500"
        />
        <div className="absolute top-3 right-4">
          <Smile className="text-zinc-400 hover:text-zinc-200 transition cursor-pointer" />
        </div>
      </div>
    </form>
  );
};
