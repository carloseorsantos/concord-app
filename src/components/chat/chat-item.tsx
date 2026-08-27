import { Member, Profile } from "@prisma/client";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { format } from "date-fns";
import { ShieldAlert, ShieldCheck } from "lucide-react";

interface ChatItemProps {
  id: string;
  currentMember: Member;
  member: Member & {
    profile: Profile;
  };
  content: string;
  fileUrl?: string | null;
  deleted: boolean;
  timestamp: string;
  isUpdated: boolean;
}

const roleIconMap = {
  GUEST: null,
  MODERATOR: <ShieldCheck className="h-4 w-4 ml-2 text-[#5865F2]" />,
  ADMIN: <ShieldAlert className="h-4 w-4 ml-2 text-[#23A55A]" />,
};

export const ChatItem = ({
  member,
  content,
  timestamp,
}: ChatItemProps) => {
  return (
    <div className="relative group flex items-start hover:bg-[#2E3035] p-4 transition w-full">
      <div className="flex gap-x-2 items-start w-full">
        <Avatar className="h-10 w-10">
          <AvatarImage src={member.profile.imageUrl} />
          <AvatarFallback>{member.profile.name[0]}</AvatarFallback>
        </Avatar>

        <div className="flex flex-col w-full">
          <div className="flex items-center gap-x-2">
            <div className="flex items-center">
              <p className="font-semibold text-sm hover:underline cursor-pointer text-white">
                {member.profile.name}
              </p>
              {roleIconMap[member.role]}
            </div>
            <span className="text-[10px] text-zinc-400">
              {format(new Date(timestamp), "dd/MM/yyyy HH:mm")}
            </span>
          </div>

          <p className="text-sm text-zinc-200 mt-1 break-words">
            {content}
          </p>
        </div>
      </div>
    </div>
  );
};
