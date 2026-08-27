"use client";

import { useEffect, useRef } from "react";
import { useMediaEngine } from "./use-media-engine";

export const useVoiceEnergyDetector = () => {
  const { audioStream, isMuted, isJoined, setIsSpeaking } = useMediaEngine();
  const animationFrameRef = useRef<number | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    if (!isJoined || isMuted || !audioStream) {
      setIsSpeaking(false);
      return;
    }

    const audioTrack = audioStream.getAudioTracks()[0];
    if (!audioTrack || !audioTrack.enabled) {
      setIsSpeaking(false);
      return;
    }

    let isMounted = true;

    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      const audioContext = new AudioCtx();
      audioContextRef.current = audioContext;

      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 256;
      analyser.smoothingTimeConstant = 0.4;

      const source = audioContext.createMediaStreamSource(audioStream);
      source.connect(analyser);

      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      const checkVolume = () => {
        if (!isMounted) return;

        analyser.getByteFrequencyData(dataArray);
        let sum = 0;
        for (let i = 0; i < bufferLength; i++) {
          sum += dataArray[i];
        }
        const average = sum / bufferLength;

        // Se a energia do som passar de 15, considera que o usuário está falando
        const speaking = average > 15 && !isMuted;
        setIsSpeaking(speaking);

        animationFrameRef.current = requestAnimationFrame(checkVolume);
      };

      checkVolume();
    } catch (err) {
      console.warn("[VoiceDetector] AudioContext could not start:", err);
    }

    return () => {
      isMounted = false;
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (audioContextRef.current && audioContextRef.current.state !== "closed") {
        audioContextRef.current.close().catch(() => {});
      }
      setIsSpeaking(false);
    };
  }, [audioStream, isMuted, isJoined, setIsSpeaking]);
};
