import { currentUser, auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

export const initialProfile = async () => {
  const user = await currentUser();

  if (!user) {
    return auth().redirectToSignIn();
  }

  const profile = await db.profile.findUnique({
    where: {
      userId: user.id,
    },
  });

  const fullName =
    `${user.firstName || ""} ${user.lastName || ""}`.trim() ||
    user.username ||
    "Usuário Concord";
  const userImage = user.imageUrl || "";

  if (profile) {
    // Sincroniza foto ou nome alterado
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
    return profile;
  }

  const newProfile = await db.profile.create({
    data: {
      userId: user.id,
      name: fullName,
      imageUrl: userImage,
      email: user.emailAddresses[0]?.emailAddress || "",
    },
  });

  return newProfile;
};
