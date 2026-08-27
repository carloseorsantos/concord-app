import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { ChannelType, MemberRole } from "@prisma/client";
import { redirect } from "next/navigation";
import { ServerHeader } from "./server-header";
import { ServerSection } from "./server-section";
import { ServerChannel } from "./server-channel";
import { ServerMember } from "./server-member";
import { UserPanel } from "@/components/user-panel";

interface ServerSidebarProps {
  serverId: string;
}

export const ServerSidebar = async ({ serverId }: ServerSidebarProps) => {
  const profile = await currentProfile();

  if (!profile) {
    return redirect("/");
  }

  const server = await db.server.findUnique({
    where: {
      id: serverId,
    },
    include: {
      channels: {
        orderBy: {
          createdAt: "asc",
        },
      },
      members: {
        include: {
          profile: true,
        },
        orderBy: {
          role: "asc",
        },
      },
    },
  });

  if (!server) {
    return redirect("/");
  }

  const textChannels = server.channels.filter(
    (channel) => channel.type === ChannelType.TEXT
  );
  const voiceChannels = server.channels.filter(
    (channel) => channel.type === ChannelType.AUDIO
  );
  const cinemaChannels = server.channels.filter(
    (channel) => channel.type === ChannelType.CINEMA_STAGE
  );

  const role = server.members.find(
    (member) => member.profileId === profile.id
  )?.role;

  return (
    <div className="flex flex-col h-full text-primary w-60 bg-[#2B2D31] select-none border-r border-[#1E1F22]">
      <ServerHeader server={server} role={role} />

      <div className="flex-1 px-3 overflow-y-auto space-y-4 pt-2">
        {/* Cinema / Watch Party Channels Section */}
        {!!cinemaChannels.length && (
          <div className="mb-2">
            <ServerSection
              sectionType="channels"
              channelType={ChannelType.CINEMA_STAGE}
              role={role}
              label="Palcos de Cinema & Watch Party"
              server={server}
            />
            <div className="space-y-[2px]">
              {cinemaChannels.map((channel) => (
                <ServerChannel
                  key={channel.id}
                  channel={channel}
                  role={role}
                  server={server}
                />
              ))}
            </div>
          </div>
        )}

        {/* Text Channels Section */}
        {!!textChannels.length && (
          <div className="mb-2">
            <ServerSection
              sectionType="channels"
              channelType={ChannelType.TEXT}
              role={role}
              label="Canais de Texto"
              server={server}
            />
            <div className="space-y-[2px]">
              {textChannels.map((channel) => (
                <ServerChannel
                  key={channel.id}
                  channel={channel}
                  role={role}
                  server={server}
                />
              ))}
            </div>
          </div>
        )}

        {/* Voice Channels Section */}
        {!!voiceChannels.length && (
          <div className="mb-2">
            <ServerSection
              sectionType="channels"
              channelType={ChannelType.AUDIO}
              role={role}
              label="Canais de Voz"
              server={server}
            />
            <div className="space-y-[2px]">
              {voiceChannels.map((channel) => (
                <ServerChannel
                  key={channel.id}
                  channel={channel}
                  role={role}
                  server={server}
                />
              ))}
            </div>
          </div>
        )}

        {/* Server Members Section */}
        {!!server.members.length && (
          <div className="mb-2">
            <ServerSection
              sectionType="members"
              role={role}
              label={`Membros Online — ${server.members.length}`}
              server={server}
            />
            <div className="space-y-[2px]">
              {server.members.map((member) => (
                <ServerMember key={member.id} member={member} />
              ))}
            </div>
          </div>
        )}
      </div>

      <UserPanel profile={profile} />
    </div>
  );
};
