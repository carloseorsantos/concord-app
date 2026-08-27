"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Member, Profile, Message } from "@prisma/client";
import { ChatItem } from "./chat-item";
import { Loader2, ServerCrash, Hash } from "lucide-react";
import { useRef, ElementRef, useEffect } from "react";

type MessageWithMemberWithProfile = Message & {
  member: Member & {
    profile: Profile;
  };
};

interface ChatMessagesProps {
  name: string;
  member: Member;
  chatId: string;
  apiUrl: string;
  paramKey: "channelId" | "conversationId";
  paramValue: string;
  type: "channel" | "conversation";
}

export const ChatMessages = ({
  name,
  member,
  apiUrl,
  paramKey,
  paramValue,
}: ChatMessagesProps) => {
  const chatRef = useRef<ElementRef<"div">>(null);
  const bottomRef = useRef<ElementRef<"div">>(null);

  const fetchMessages = async () => {
    const res = await axios.get(`${apiUrl}?${paramKey}=${paramValue}`);
    return res.data;
  };

  const { data, status } = useQuery({
    queryKey: [`chat:${paramValue}`],
    queryFn: fetchMessages,
    refetchInterval: 1500, // Polling fallback para chat instantâneo
  });

  const messages: MessageWithMemberWithProfile[] = data?.items || [];

  // Auto-scroll to bottom when messages arrive
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages.length]);

  if (status === "pending") {
    return (
      <div className="flex flex-col flex-1 justify-center items-center h-full bg-[#313338]">
        <Loader2 className="h-7 w-7 text-zinc-500 animate-spin my-4" />
        <p className="text-xs text-zinc-400">Carregando mensagens...</p>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="flex flex-col flex-1 justify-center items-center h-full bg-[#313338]">
        <ServerCrash className="h-7 w-7 text-zinc-500 my-4" />
        <p className="text-xs text-zinc-400">Algo deu errado ao carregar o chat.</p>
      </div>
    );
  }

  // Ordena da mensagem mais antiga para a mais recente
  const chronologicalMessages = [...messages].reverse();

  return (
    <div
      ref={chatRef}
      className="flex-1 flex flex-col py-4 overflow-y-auto bg-[#313338]"
    >
      {/* Welcome Message at the very top */}
      <div className="space-y-2 px-4 mb-6 pt-4">
        <div className="h-[68px] w-[68px] rounded-full bg-[#2B2D31] flex items-center justify-center">
          <Hash className="h-9 w-9 text-white" />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-white">
          Bem-vindo ao #{name}!
        </h2>
        <p className="text-zinc-400 text-xs md:text-sm">
          Este é o início do canal #{name}. Envie mensagens, imagens ou transmita a sua tela!
        </p>
      </div>

      <div className="h-px bg-[#3F4147] mx-4 mb-4" />

      {/* Messages Stream starting below the title */}
      <div className="flex flex-col space-y-1">
        {chronologicalMessages.map((message) => (
          <ChatItem
            key={message.id}
            id={message.id}
            currentMember={member}
            member={message.member}
            content={message.content}
            fileUrl={message.fileUrl}
            deleted={message.deleted}
            timestamp={message.createdAt.toString()}
            isUpdated={message.updatedAt !== message.createdAt}
          />
        ))}
      </div>

      <div ref={bottomRef} className="h-1" />
    </div>
  );
};
