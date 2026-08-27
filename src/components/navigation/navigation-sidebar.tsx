import { redirect } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NavigationAction } from "./navigation-action";
import { NavigationItem } from "./navigation-item";
import { Clapperboard } from "lucide-react";
import { ActionTooltip } from "@/components/ui/tooltip";

export const NavigationSidebar = async () => {
  const profile = await currentProfile();

  if (!profile) {
    return redirect("/");
  }

  const servers = await db.server.findMany({
    where: {
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  return (
    <div className="space-y-4 flex flex-col items-center h-full text-primary w-full bg-[#1E1F22] py-3 select-none">
      {/* Concord Logo Button */}
      <ActionTooltip side="right" align="center" label="Concord Watch Party">
        <div className="flex mx-3 h-[48px] w-[48px] rounded-[24px] hover:rounded-[16px] transition-all overflow-hidden items-center justify-center bg-[#5865F2] text-white shadow-lg cursor-pointer">
          <Clapperboard className="h-6 w-6" />
        </div>
      </ActionTooltip>

      <div className="h-[2px] bg-[#35363C] rounded-md w-10 mx-auto" />

      {/* Servers List */}
      <div className="flex-1 w-full overflow-y-auto space-y-4">
        {servers.map((server) => (
          <div key={server.id} className="mb-4">
            <NavigationItem
              id={server.id}
              name={server.name}
              imageUrl={server.imageUrl}
            />
          </div>
        ))}
        <NavigationAction />
      </div>

      {/* User Profile Clerk Button */}
      <div className="pb-3 mt-auto flex items-center flex-col gap-y-4">
        <UserButton
          afterSignOutUrl="/"
          appearance={{
            elements: {
              avatarBox: "h-[44px] w-[44px]",
            },
          }}
        />
      </div>
    </div>
  );
};
