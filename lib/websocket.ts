"use client";

export class WebSocketClient {
  private ws: WebSocket | null = null;
  private messageHandlers: Map<string, ((data: unknown) => void)[]> = new Map();

  constructor() {
    if (typeof window !== "undefined") {
      this.connect();
    }
  }

  // Connect to WebSocket server
  private connect() {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      return;
    }

    try {
      const wsUrl = process.env.NEXT_PUBLIC_WEBSOCKET_URL || "ws://localhost:4000";
      this.ws = new WebSocket(wsUrl);

      this.ws.onopen = () => {
        console.log("WebSocket connected");
        // Trigger connected event
        this.handleMessage({ type: "connected", data: {} });
      };

      this.ws.onmessage = (event) => {
        try {
          const message = JSON.parse(event.data);
          this.handleMessage(message);
        } catch (error) {
          console.error("Error parsing WebSocket message:", error);
        }
      };

      this.ws.onclose = () => {
        console.log("WebSocket disconnected");
        // Trigger disconnected event
        this.handleMessage({ type: "disconnected", data: {} });
      };

      this.ws.onerror = (error) => {
        console.error("WebSocket error:", error);
      };
    } catch (error) {
      console.error("Error creating WebSocket connection:", error);
    }
  }

  // Send message to server
  send(type: string, data: unknown) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({ type, data }));
    } else {
      console.warn("WebSocket is not connected");
    }
  }

  // Handle incoming messages
  private handleMessage(message: { type: string; data: unknown }) {
    const handlers = this.messageHandlers.get(message.type) || [];
    handlers.forEach((handler) => {
      try {
        handler(message.data);
      } catch (error) {
        console.error(`Error in message handler for ${message.type}:`, error);
      }
    });
  }

  // Add message handler
  on(messageType: string, handler: (data: unknown) => void) {
    if (!this.messageHandlers.has(messageType)) {
      this.messageHandlers.set(messageType, []);
    }
    this.messageHandlers.get(messageType)!.push(handler);
  }

  // Remove message handler
  off(messageType: string, handler: (data: unknown) => void) {
    const handlers = this.messageHandlers.get(messageType);
    if (handlers) {
      const index = handlers.indexOf(handler);
      if (index > -1) {
        handlers.splice(index, 1);
      }
    }
  }

  // Disconnect
  disconnect() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }

  // Get connection status
  getConnectionStatus(): "connecting" | "connected" | "disconnected" {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) return "connected";
    if (this.ws && this.ws.readyState === WebSocket.CONNECTING)
      return "connecting";
    return "disconnected";
  }
}

// Create a singleton instance
export const wsClient = new WebSocketClient();
