"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { wsClient } from "@/lib/websocket";

interface WebSocketContextType {
  isConnected: boolean;
  send: (type: string, data: any) => void;
  on: (type: string, handler: (data: any) => void) => void;
  off: (type: string, handler: (data: any) => void) => void;
}

const WebSocketContext = createContext<WebSocketContextType | undefined>(
  undefined
);

interface WebSocketProviderProps {
  children: ReactNode;
}

export function WebSocketProvider({ children }: WebSocketProviderProps) {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Set up connection status tracking
    const handleConnection = () => {
      setIsConnected(true);
    };

    const handleDisconnection = () => {
      setIsConnected(false);
    };

    // Listen for connection events
    wsClient.on("connected", handleConnection);
    wsClient.on("disconnected", handleDisconnection);

    // Check initial connection status
    setIsConnected(wsClient.getConnectionStatus() === "connected");

    return () => {
      wsClient.off("connected", handleConnection);
      wsClient.off("disconnected", handleDisconnection);
    };
  }, []);

  const send = (type: string, data: any) => {
    wsClient.send(type, data);
  };

  const on = (type: string, handler: (data: any) => void) => {
    wsClient.on(type, handler);
  };

  const off = (type: string, handler: (data: any) => void) => {
    wsClient.off(type, handler);
  };

  const value: WebSocketContextType = {
    isConnected,
    send,
    on,
    off,
  };

  return (
    <WebSocketContext.Provider value={value}>
      {children}
    </WebSocketContext.Provider>
  );
}

export function useWebSocketContext() {
  const context = useContext(WebSocketContext);
  if (context === undefined) {
    throw new Error(
      "useWebSocketContext must be used within a WebSocketProvider"
    );
  }
  return context;
}
