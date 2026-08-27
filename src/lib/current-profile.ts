import { auth, currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

export const currentProfile = async () => {
  const { userId } = auth();

  if (!userId) {
    return null;
  }

  const profile = await db.profile.findUnique({
    where: {
      userId,
    },
  });

  const user = await currentUser();
  if (user) {
    const fullName =
      `${user.firstName || ""} ${user.lastName || ""}`.trim() ||
      user.username ||
      "Usuário Concord";
    const userImage = user.imageUrl || "";

    if (!profile) {
      return await db.profile.create({
        data: {
          userId: user.id,
          name: fullName,
          imageUrl: userImage,
          email: user.emailAddresses[0]?.emailAddress || "",
        },
      });
    }

    // Se o avatar ou nome foram modificados no Clerk, atualiza no banco automaticamente
    if (
      profile.imageUrl !== userImage ||
      (fullName && profile.name !== fullName)
    ) {
      return await db.profile.update({
        where: {
          id: profile.id,
        },
        data: {
          name: fullName,
          imageUrl: userImage,
        },
      });
    }
  }

  return profile;
};
