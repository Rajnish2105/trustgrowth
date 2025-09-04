import { useContext, useEffect, useState } from "react";

// Create a safe WebSocket context hook
export const useWebSocketSafe = () => {
  const [wsContext, setWsContext] = useState<any>(null);
  const [isAvailable, setIsAvailable] = useState(false);

  useEffect(() => {
    try {
      // Dynamically import the WebSocket context
      import("@/contexts/WebSocketContext")
        .then(({ useWebSocketContext }) => {
          try {
            const context = useWebSocketContext();
            setWsContext(context);
            setIsAvailable(true);
          } catch (error) {
            // Context not available (not wrapped in provider)
            console.log(
              "WebSocket context not available, notifications will work without real-time updates"
            );
            setIsAvailable(false);
          }
        })
        .catch(() => {
          // Module not found or other import error
          console.log("WebSocket module not available");
          setIsAvailable(false);
        });
    } catch (error) {
      setIsAvailable(false);
    }
  }, []);

  return {
    isAvailable,
    on: (event: string, handler: (data: any) => void) => {
      if (wsContext && isAvailable) {
        wsContext.on(event, handler);
      }
    },
    off: (event: string, handler: (data: any) => void) => {
      if (wsContext && isAvailable) {
        wsContext.off(event, handler);
      }
    },
    send: (type: string, data: any) => {
      if (wsContext && isAvailable) {
        wsContext.send(type, data);
      }
    },
  };
};
