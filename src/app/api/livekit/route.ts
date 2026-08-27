import { AccessToken } from "livekit-server-sdk";
import { NextRequest, NextResponse } from "next/server";
import { currentProfile } from "@/lib/current-profile";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const profile = await currentProfile();

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const room = req.nextUrl.searchParams.get("room");
    const username = req.nextUrl.searchParams.get("username") || profile.name;

    if (!room) {
      return new NextResponse("Missing room parameter", { status: 400 });
    }

    const apiKey = process.env.LIVEKIT_API_KEY || "devkey";
    const apiSecret = process.env.LIVEKIT_API_SECRET || "secret";
    const wsUrl = process.env.NEXT_PUBLIC_LIVEKIT_URL || "ws://127.0.0.1:7880";

    const at = new AccessToken(apiKey, apiSecret, {
      identity: profile.userId,
      name: username,
      metadata: JSON.stringify({
        avatar: profile.imageUrl,
        profileId: profile.id,
      }),
    });

    at.addGrant({
      room,
      roomJoin: true,
      canPublish: true,
      canSubscribe: true,
      canPublishData: true,
    });

    const token = await at.toJwt();

    return NextResponse.json({ token, wsUrl });
  } catch (error) {
    console.error("[LIVEKIT_TOKEN_ERROR]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
