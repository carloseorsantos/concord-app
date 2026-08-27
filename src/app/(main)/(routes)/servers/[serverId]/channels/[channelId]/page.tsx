import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { ChannelType } from "@prisma/client";
import { ChatHeader } from "@/components/chat/chat-header";
import { ChatInput } from "@/components/chat/chat-input";
import { ChatMessages } from "@/components/chat/chat-messages";
import { MediaRoom } from "@/components/media/media-room";

interface ChannelIdPageProps {
  params: {
    serverId: string;
    channelId: string;
  };
}

const ChannelIdPage = async ({ params }: ChannelIdPageProps) => {
  const profile = await currentProfile();

  if (!profile) {
    return redirect("/");
  }

  const channel = await db.channel.findUnique({
    where: {
      id: params.channelId,
    },
  });

  const member = await db.member.findFirst({
    where: {
      serverId: params.serverId,
      profileId: profile.id,
    },
  });

  if (!channel || !member) {
    return redirect("/");
  }

  const isText = channel.type === ChannelType.TEXT;
  const isAudio = channel.type === ChannelType.AUDIO;
  const isCinema = channel.type === ChannelType.CINEMA_STAGE || channel.type === ChannelType.VIDEO;

  return (
    <div className="bg-[#313338] flex flex-col h-full w-full flex-1 overflow-hidden">
      <ChatHeader
        name={channel.name}
        serverId={channel.serverId}
        type="channel"
        channelType={channel.type}
      />

      {isText && (
        <>
          <ChatMessages
            member={member}
            name={channel.name}
            chatId={channel.id}
            type="channel"
            apiUrl="/api/messages"
            paramKey="channelId"
            paramValue={channel.id}
          />
          <ChatInput
            name={channel.name}
            type="channel"
            apiUrl="/api/messages"
            query={{
              channelId: channel.id,
              serverId: channel.serverId,
            }}
          />
        </>
      )}

      {isAudio && (
        <MediaRoom
          chatId={channel.id}
          video={false}
          audio={true}
          isCinemaStage={false}
        />
      )}

      {isCinema && (
        <MediaRoom
          chatId={channel.id}
          video={true}
          audio={true}
          isCinemaStage={true}
        />
      )}
    </div>
  );
};

export default ChannelIdPage;
