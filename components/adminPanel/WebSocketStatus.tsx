"use client";

import { useWebSocket } from "@/hooks/useWebSocket";
import { Badge } from "@/components/ui/badge";
import { Wifi, WifiOff } from "lucide-react";

export function WebSocketStatus() {
  const { isConnected } = useWebSocket();

  return (
    <div className="flex items-center gap-2">
      {isConnected ? (
        <>
          <Wifi className="h-4 w-4 text-green-500" />
          <Badge variant="default" className="bg-green-500">
            Connected
          </Badge>
        </>
      ) : (
        <>
          <WifiOff className="h-4 w-4 text-red-500" />
          <Badge variant="destructive">Disconnected</Badge>
        </>
      )}
    </div>
  );
}
