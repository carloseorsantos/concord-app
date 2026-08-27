"use client";

import { Channel, ChannelType, MemberRole, Server } from "@prisma/client";
import { Hash, Mic, Clapperboard, Sparkles } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface ServerChannelProps {
  channel: Channel;
  server: Server;
  role?: MemberRole;
}

const iconMap = {
  [ChannelType.TEXT]: Hash,
  [ChannelType.AUDIO]: Mic,
  [ChannelType.VIDEO]: Clapperboard,
  [ChannelType.CINEMA_STAGE]: Clapperboard,
};

export const ServerChannel = ({
  channel,
  server,
}: ServerChannelProps) => {
  const params = useParams();
  const router = useRouter();

  const Icon = iconMap[channel.type];
  const isSelected = params?.channelId === channel.id;
  const isCinema = channel.type === ChannelType.CINEMA_STAGE;

  const onClick = () => {
    router.push(`/servers/${server.id}/channels/${channel.id}`);
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        "group px-2 py-2 rounded-md flex items-center gap-x-2 w-full hover:bg-[#35373C] transition mb-1 text-left",
        isSelected && "bg-[#35373C] text-white",
        !isSelected && "text-zinc-400 hover:text-zinc-200"
      )}
    >
      <Icon
        className={cn(
          "flex-shrink-0 w-5 h-5",
          isSelected ? "text-white" : "text-zinc-400 group-hover:text-zinc-200",
          isCinema && "text-[#5865F2]"
        )}
      />
      <p
        className={cn(
          "line-clamp-1 font-semibold text-sm transition truncate",
          isSelected && "text-white",
          !isSelected && "text-zinc-400 group-hover:text-zinc-200"
        )}
      >
        {channel.name}
      </p>

      {isCinema && (
        <span className="ml-auto bg-[#5865F2]/20 text-[#5865F2] text-[10px] font-bold px-1.5 py-0.5 rounded border border-[#5865F2]/30 flex items-center gap-x-1">
          <Sparkles className="h-2.5 w-2.5" />
          Cinema
        </span>
      )}
    </button>
  );
};
