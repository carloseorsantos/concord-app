"use client";

import { Profile } from "@prisma/client";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Mic, MicOff, Headphones, Settings, PhoneOff } from "lucide-react";
import { ActionTooltip } from "@/components/ui/tooltip";
import { useModal } from "@/hooks/use-modal-store";
import { useVoiceState } from "@/hooks/use-voice-state";

interface UserPanelProps {
  profile: Profile;
}

export const UserPanel = ({ profile }: UserPanelProps) => {
  const { onOpen } = useModal();
  const {
    isMuted,
    isDeafened,
    isInCall,
    currentChannelName,
    toggleMic,
    setIsDeafened,
    disconnect,
  } = useVoiceState();

  return (
    <div className="h-14 bg-[#232428] px-2 flex items-center justify-between border-t border-[#1F2023] select-none shrink-0">
      <div className="flex items-center gap-x-2 truncate hover:bg-[#35373C] p-1 rounded-md cursor-pointer transition flex-1 min-w-0 mr-1">
        <div className="relative shrink-0">
          <Avatar className="h-8 w-8">
            <AvatarImage src={profile.imageUrl} />
            <AvatarFallback className="bg-[#5865F2] font-bold text-white uppercase">
              {profile.name[0]}
            </AvatarFallback>
          </Avatar>
          <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-[#23A55A] border-2 border-[#232428]" />
        </div>
        <div className="flex flex-col truncate min-w-0">
          <span className="text-xs font-bold text-white truncate">
            {profile.name}
          </span>
          <span className="text-[10px] text-zinc-400 font-mono truncate">
            {isInCall ? (
              <span className="text-[#23A55A] font-semibold">
                ● Conectado {currentChannelName ? `(#${currentChannelName})` : ""}
              </span>
            ) : (
              "#online"
            )}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-x-0.5 shrink-0">
        {isInCall && (
          <ActionTooltip label="Desconectar da Chamada">
            <button
              onClick={disconnect}
              className="p-1.5 hover:bg-[#DA373C]/20 rounded-md text-[#DA373C] hover:text-[#ED4245] transition mr-0.5"
            >
              <PhoneOff className="h-4 w-4" />
            </button>
          </ActionTooltip>
        )}

        <ActionTooltip label={isMuted ? "Desmutar Microfone" : "Mutar Microfone"}>
          <button
            onClick={toggleMic}
            className="p-1.5 hover:bg-[#35373C] rounded-md text-zinc-400 hover:text-white transition"
          >
            {isMuted ? (
              <MicOff className="h-4 w-4 text-[#DA373C]" />
            ) : (
              <Mic className="h-4 w-4 text-[#23A55A]" />
            )}
          </button>
        </ActionTooltip>

        <ActionTooltip label={isDeafened ? "Ativar Áudio" : "Desativar Fone (Deafen)"}>
          <button
            onClick={() => setIsDeafened(!isDeafened)}
            className="p-1.5 hover:bg-[#35373C] rounded-md text-zinc-400 hover:text-white transition"
          >
            <Headphones
              className={`h-4 w-4 ${isDeafened ? "text-[#DA373C]" : ""}`}
            />
          </button>
        </ActionTooltip>

        <ActionTooltip label="Configurações de Transmissão">
          <button
            onClick={() => onOpen("streamQuality")}
            className="p-1.5 hover:bg-[#35373C] rounded-md text-zinc-400 hover:text-white transition"
          >
            <Settings className="h-4 w-4" />
          </button>
        </ActionTooltip>
      </div>
    </div>
  );
};
