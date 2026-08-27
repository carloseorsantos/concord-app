"use client";

import { Member, Profile } from "@prisma/client";
import { ShieldAlert, ShieldCheck } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface ServerMemberProps {
  member: Member & { profile: Profile };
}

const roleIconMap = {
  GUEST: null,
  MODERATOR: <ShieldCheck className="h-4 w-4 ml-2 text-[#5865F2]" />,
  ADMIN: <ShieldAlert className="h-4 w-4 ml-2 text-[#23A55A]" />,
};

export const ServerMember = ({ member }: ServerMemberProps) => {
  const params = useParams();
  const router = useRouter();

  const icon = roleIconMap[member.role];
  const isSelected = params?.memberId === member.id;

  return (
    <div
      className={cn(
        "group px-2 py-1.5 rounded-md flex items-center gap-x-2 w-full hover:bg-[#35373C] transition mb-1 cursor-pointer",
        isSelected && "bg-[#35373C]"
      )}
    >
      <div className="relative">
        <Avatar className="h-8 w-8">
          <AvatarImage src={member.profile.imageUrl} />
          <AvatarFallback>{member.profile.name[0]}</AvatarFallback>
        </Avatar>
        <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-[#23A55A] border-2 border-[#2B2D31]" />
      </div>
      <p
        className={cn(
          "font-semibold text-xs text-zinc-300 group-hover:text-white transition truncate",
          isSelected && "text-white"
        )}
      >
        {member.profile.name}
      </p>
      {icon}
    </div>
  );
};
