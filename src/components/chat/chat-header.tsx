import { Hash, Mic, Clapperboard, Sparkles } from "lucide-react";
import { ChannelType } from "@prisma/client";

interface ChatHeaderProps {
  serverId: string;
  name: string;
  type: "channel" | "conversation";
  channelType?: ChannelType;
  imageUrl?: string;
}

export const ChatHeader = ({
  name,
  channelType,
}: ChatHeaderProps) => {
  const isCinema = channelType === ChannelType.CINEMA_STAGE;

  return (
    <div className="text-md font-semibold px-4 flex items-center h-12 border-[#1E1F22] border-b-2 bg-[#313338] z-10 select-none">
      {channelType === ChannelType.TEXT && (
        <Hash className="w-5 h-5 text-zinc-400 mr-2" />
      )}
      {channelType === ChannelType.AUDIO && (
        <Mic className="w-5 h-5 text-zinc-400 mr-2" />
      )}
      {isCinema && (
        <Clapperboard className="w-5 h-5 text-[#5865F2] mr-2" />
      )}

      <p className="font-semibold text-sm text-white">{name}</p>

      {isCinema && (
        <span className="ml-3 bg-[#5865F2]/20 text-[#5865F2] text-[10px] font-extrabold uppercase px-2 py-0.5 rounded border border-[#5865F2]/40 flex items-center gap-x-1">
          <Sparkles className="h-3 w-3" />
          Watch Party 60FPS
        </span>
      )}
    </div>
  );
};
