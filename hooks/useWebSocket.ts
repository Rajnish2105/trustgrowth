"use client";

import { useWebSocketContext } from "@/contexts/WebSocketContext";
import { useEffect, useCallback } from "react";

export function useWebSocket() {
  const { isConnected, send, on, off } = useWebSocketContext();

  // Send a new call
  const sendNewCall = useCallback(
    (callData: any) => {
      send("call", callData);
    },
    [send]
  );

  // Send a call update
  const sendCallUpdate = useCallback(
    (updateData: any) => {
      send("update-call", updateData);
    },
    [send]
  );

  // Listen for new calls
  const onNewCall = useCallback(
    (handler: (data: any) => void) => {
      on("call", handler);
      return () => off("call", handler);
    },
    [on, off]
  );

  // Listen for call updates
  const onCallUpdate = useCallback(
    (handler: (data: any) => void) => {
      on("update-call", handler);
      return () => off("update-call", handler);
    },
    [on, off]
  );

  // Generic message listener
  const onMessage = useCallback(
    (type: string, handler: (data: any) => void) => {
      on(type, handler);
      return () => off(type, handler);
    },
    [on, off]
  );

  return {
    isConnected,
    sendNewCall,
    sendCallUpdate,
    onNewCall,
    onCallUpdate,
    onMessage,
    send,
  };
}
