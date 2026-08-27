"use client";

import { Participant } from "livekit-client";
import { useIsSpeaking, VideoTrack, isTrackReference, TrackReferenceOrPlaceholder } from "@livekit/components-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Mic, MicOff, Volume2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useVoiceState } from "@/hooks/use-voice-state";

interface ParticipantCardProps {
  participant: Participant;
  cameraTrack?: TrackReferenceOrPlaceholder;
  totalParticipants: number;
  isMini?: boolean;
}

export const ParticipantCard = ({
  participant,
  cameraTrack,
  totalParticipants,
  isMini = false,
}: ParticipantCardProps) => {
  const isSpeaking = useIsSpeaking(participant);
  const { isMuted: localVoiceMuted } = useVoiceState();

  // If local participant, prioritize synchronized local voice state
  const isMuted = participant.isLocal
    ? localVoiceMuted
    : !participant.isMicrophoneEnabled;

  // Extract avatar from metadata
  let avatarUrl = "";
  try {
    if (participant.metadata) {
      const parsed = JSON.parse(participant.metadata);
      avatarUrl = parsed.avatar || "";
    }
  } catch (e) {
    // metadata is not JSON
  }

  // Camera is active only if participant has camera enabled and track reference exists
  const hasCamera = Boolean(participant.isCameraEnabled && cameraTrack && isTrackReference(cameraTrack));

  // Dynamic avatar size based on count of users and mini mode
  const getAvatarSize = () => {
    if (isMini) return "h-14 w-14 text-lg";
    if (totalParticipants <= 1) return "h-32 w-32 md:h-40 md:w-40 text-4xl";
    if (totalParticipants <= 2) return "h-24 w-24 md:h-32 md:w-32 text-2xl";
    if (totalParticipants <= 4) return "h-20 w-20 md:h-24 md:w-24 text-xl";
    return "h-14 w-14 md:h-16 md:w-16 text-lg";
  };

  const displayName = participant.name || participant.identity || "Usuário";

  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-center bg-[#2B2D31] rounded-2xl overflow-hidden border transition-all duration-200 select-none group",
        isSpeaking && !isMuted
          ? "border-[#23A55A] ring-4 ring-[#23A55A]/50 shadow-[0_0_30px_rgba(35,165,90,0.3)] scale-[1.01]"
          : "border-[#3F4147] hover:border-zinc-500",
        isMini
          ? "w-44 h-32 md:w-52 md:h-36 shrink-0"
          : totalParticipants <= 1
          ? "w-full max-w-2xl aspect-[16/10] max-h-[65vh]"
          : totalParticipants <= 2
          ? "w-full max-w-xl aspect-video max-h-[50vh]"
          : totalParticipants <= 4
          ? "w-full max-w-lg aspect-video max-h-[42vh]"
          : "w-full aspect-video max-h-[35vh]"
      )}
    >
      {/* If Camera is Active: Live Video Track */}
      {hasCamera && cameraTrack && isTrackReference(cameraTrack) ? (
        <VideoTrack
          trackRef={cameraTrack}
          className="w-full h-full object-cover"
        />
      ) : (
        /* Avatar Display with Speaking Ring */
        <div className="flex flex-col items-center justify-center p-4">
          <div className="relative">
            <Avatar
              className={cn(
                getAvatarSize(),
                "transition-all duration-200",
                isSpeaking && !isMuted
                  ? "ring-4 ring-[#23A55A] ring-offset-4 ring-offset-[#2B2D31] shadow-lg"
                  : "border-2 border-transparent"
              )}
            >
              <AvatarImage src={avatarUrl} alt={displayName} />
              <AvatarFallback className="bg-[#5865F2] font-bold text-white uppercase">
                {displayName.slice(0, 2)}
              </AvatarFallback>
            </Avatar>

            {/* Speaking animated green radar ring */}
            {isSpeaking && !isMuted && (
              <span className="absolute -inset-1 rounded-full border-2 border-[#23A55A] animate-ping opacity-60 pointer-events-none" />
            )}
          </div>
        </div>
      )}

      {/* Bottom Name and Status Overlay */}
      <div className="absolute bottom-2.5 left-2.5 bg-black/75 backdrop-blur-md px-2.5 py-1 rounded-lg flex items-center gap-x-2 text-xs font-semibold text-white border border-white/10 max-w-[80%] z-10">
        {isSpeaking && !isMuted && (
          <span className="h-2 w-2 rounded-full bg-[#23A55A] animate-pulse shrink-0" />
        )}
        <span className="truncate">{displayName}</span>
        {participant.isLocal && (
          <span className="text-[10px] text-zinc-400 font-normal shrink-0">
            (Você)
          </span>
        )}
      </div>

      {/* Mic Status Badge on Bottom Right */}
      <div className="absolute bottom-2.5 right-2.5 z-10">
        {isMuted ? (
          <div className="bg-[#DA373C] p-1.5 rounded-full text-white shadow-md">
            <MicOff className="h-3 w-3" />
          </div>
        ) : isSpeaking ? (
          <div className="bg-[#23A55A] p-1.5 rounded-full text-white shadow-md animate-bounce">
            <Volume2 className="h-3 w-3" />
          </div>
        ) : (
          <div className="bg-black/50 p-1.5 rounded-full text-zinc-400">
            <Mic className="h-3 w-3" />
          </div>
        )}
      </div>
    </div>
  );
};
