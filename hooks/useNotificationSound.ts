import { useRef, useCallback } from "react";

export const useNotificationSound = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const initializeAudio = useCallback(() => {
    if (typeof window !== "undefined" && !audioRef.current) {
      try {
        audioRef.current = new Audio("/notification.wav");
        audioRef.current.preload = "auto";
        audioRef.current.volume = 0.5; // Set volume to 50%

        // Add error handling for audio loading
        audioRef.current.addEventListener("error", (e) => {
          console.error("Audio loading error:", e);
        });
      } catch (error) {
        console.error("Failed to initialize audio:", error);
      }
    }
  }, []);

  const playNotificationSound = useCallback(async () => {
    try {
      initializeAudio();
      if (audioRef.current) {
        // Check if audio is ready to play
        if (audioRef.current.readyState >= 2) {
          // HAVE_CURRENT_DATA
          // Reset audio to beginning in case it was already played
          audioRef.current.currentTime = 0;
          await audioRef.current.play();
        } else {
          // Wait for audio to be ready
          audioRef.current.addEventListener(
            "canplaythrough",
            async () => {
              audioRef.current!.currentTime = 0;
              await audioRef.current!.play();
            },
            { once: true }
          );
        }
      }
    } catch (error) {
      console.error("Failed to play notification sound:", error);
      // Fallback: try to play without await
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch((e) => {
          console.error("Fallback play failed:", e);
        });
      }
    }
  }, [initializeAudio]);

  return { playNotificationSound, initializeAudio };
};
