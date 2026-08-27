"use client";

import { useEffect, useState } from "react";
import { CreateServerModal } from "@/components/modals/create-server-modal";
import { InviteModal } from "@/components/modals/invite-modal";
import { CreateChannelModal } from "@/components/modals/create-channel-modal";
import { ScreenShareDRMModal } from "@/components/modals/screen-share-drm-modal";
import { StreamQualityModal } from "@/components/modals/stream-quality-modal";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <CreateServerModal />
      <InviteModal />
      <CreateChannelModal />
      <ScreenShareDRMModal />
      <StreamQualityModal />
    </>
  );
};
