"use client";

import { ServerWithMembersWithProfiles } from "@/types";
import { MemberRole } from "@prisma/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ChevronDown,
  UserPlus,
  PlusCircle,
  Clapperboard,
  LogOut,
} from "lucide-react";
import { useModal } from "@/hooks/use-modal-store";

interface ServerHeaderProps {
  server: ServerWithMembersWithProfiles;
  role?: MemberRole;
}

export const ServerHeader = ({ server, role }: ServerHeaderProps) => {
  const { onOpen } = useModal();

  const isAdmin = role === MemberRole.ADMIN;
  const isModerator = isAdmin || role === MemberRole.MODERATOR;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none" asChild>
        <button className="w-full text-md font-semibold px-3 flex items-center h-12 border-[#1E1F22] border-b-2 hover:bg-[#35373C]/50 transition text-white">
          <span className="truncate">{server.name}</span>
          <ChevronDown className="h-5 w-5 ml-auto text-zinc-400" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 text-xs font-medium text-zinc-300 space-y-[2px] bg-[#111214] border-0 p-1.5 rounded-md shadow-xl">
        {isModerator && (
          <DropdownMenuItem
            onClick={() => onOpen("invite", { server })}
            className="text-[#5865F2] px-3 py-2 text-sm cursor-pointer hover:bg-[#5865F2] hover:text-white rounded-sm transition"
          >
            Convidar Pessoas
            <UserPlus className="h-4 w-4 ml-auto" />
          </DropdownMenuItem>
        )}
        {isModerator && (
          <DropdownMenuItem
            onClick={() => onOpen("createChannel", { server })}
            className="px-3 py-2 text-sm cursor-pointer hover:bg-[#5865F2] hover:text-white rounded-sm transition text-zinc-200"
          >
            Criar Canal
            <PlusCircle className="h-4 w-4 ml-auto" />
          </DropdownMenuItem>
        )}
        {isModerator && (
          <DropdownMenuItem
            onClick={() => onOpen("screenShareDRM")}
            className="text-[#FEE75C] px-3 py-2 text-sm cursor-pointer hover:bg-[#FEE75C] hover:text-black rounded-sm transition"
          >
            Dicas Watch Party / DRM
            <Clapperboard className="h-4 w-4 ml-auto" />
          </DropdownMenuItem>
        )}
        {isModerator && <DropdownMenuSeparator className="bg-[#2B2D31] my-1" />}
        {!isAdmin && (
          <DropdownMenuItem
            className="text-[#DA373C] px-3 py-2 text-sm cursor-pointer hover:bg-[#DA373C] hover:text-white rounded-sm transition"
          >
            Sair do Servidor
            <LogOut className="h-4 w-4 ml-auto" />
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
