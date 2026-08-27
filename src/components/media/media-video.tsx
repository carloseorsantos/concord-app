"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface MediaVideoProps {
  stream: MediaStream | null;
  className?: string;
  isMirrored?: boolean;
}

export const MediaVideo = ({
  stream,
  className,
  isMirrored = false,
}: MediaVideoProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
      videoRef.current.play().catch((err) => {
        console.warn("[MediaVideo] Autoplay prevented:", err);
      });
    }
  }, [stream]);

  if (!stream) return null;

  return (
    <video
      ref={videoRef}
      autoPlay
      playsInline
      muted
      className={cn(
        "w-full h-full object-cover",
        isMirrored && "scale-x-[-1]",
        className
      )}
    />
  );
};
