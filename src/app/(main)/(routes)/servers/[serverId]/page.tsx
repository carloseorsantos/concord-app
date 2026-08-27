import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

interface ServerIdPageProps {
  params: {
    serverId: string;
  };
}

const ServerIdPage = async ({ params }: ServerIdPageProps) => {
  const profile = await currentProfile();

  if (!profile) {
    return redirect("/");
  }

  const server = await db.server.findUnique({
    where: {
      id: params.serverId,
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
    include: {
      channels: {
        orderBy: {
          createdAt: "asc",
        },
      },
    },
  });

  const initialChannel =
    server?.channels.find((c) => c.type === "TEXT" && c.name === "geral") ||
    server?.channels.find((c) => c.type === "TEXT") ||
    server?.channels[0];

  if (!initialChannel) {
    return null;
  }

  return redirect(`/servers/${params.serverId}/channels/${initialChannel.id}`);
};

export default ServerIdPage;
