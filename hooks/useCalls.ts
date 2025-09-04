"use client";

import { useState, useEffect, useCallback } from "react";
import { useWebSocket } from "./useWebSocket";

export interface Call {
  id: string;
  symbol: string;
  entry: number;
  stoploss: number;
  minTarget: number;
  stock: string;
  action: "BUY" | "SELL" | "WATCH" | "HOLD";
  description: string;
  imageUrl: string;
  exit?: string;
  return?: string;
  createdAt: string;
  updatedAt: string;
}

export function useCalls() {
  const [calls, setCalls] = useState<Call[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { sendNewCall, sendCallUpdate, onNewCall, onCallUpdate } =
    useWebSocket();

  // Fetch all calls from API
  const fetchCalls = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      console.log("Fetching calls from API...");
      const response = await fetch("/api/calls");
      console.log("Response status:", response.status);

      if (!response.ok) {
        const errorData = await response.json();
        console.error("API Error:", errorData);
        throw new Error(errorData.error || "Failed to fetch calls");
      }
      const data = await response.json();
      console.log("API Response:", data);
      setCalls(data.calls || []);
    } catch (err) {
      console.error("Fetch calls error:", err);
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Create a new call
  const createCall = useCallback(
    async (formData: FormData) => {
      try {
        setError(null);
        const response = await fetch("/api/calls", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Failed to create call");
        }

        const newCall = await response.json();

        // Optimistically update local state
        setCalls((prev) => [newCall.call, ...prev]);

        // Broadcast via WebSocket
        sendNewCall(newCall.call);

        return newCall.call;
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to create call");
        throw err;
      }
    },
    [sendNewCall]
  );

  // Update an existing call
  const updateCall = useCallback(
    async (id: string, updateData: Partial<Call>) => {
      try {
        setError(null);
        const response = await fetch(`/api/calls/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updateData),
        });

        if (!response.ok) {
          throw new Error("Failed to update call");
        }

        const updatedCall = await response.json();

        // Optimistically update local state
        setCalls((prev) =>
          prev.map((call) => (call.id === id ? updatedCall.call : call))
        );

        // Broadcast via WebSocket
        sendCallUpdate(updatedCall.call);

        return updatedCall.call;
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to update call");
        throw err;
      }
    },
    [sendCallUpdate]
  );

  // Delete a call
  const deleteCall = useCallback(
    async (id: string) => {
      try {
        setError(null);
        const response = await fetch(`/api/calls/${id}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error("Failed to delete call");
        }

        // Optimistically update local state
        setCalls((prev) => prev.filter((call) => call.id !== id));

        // Broadcast via WebSocket
        sendCallUpdate({ id, deleted: true });
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to delete call");
        throw err;
      }
    },
    [sendCallUpdate]
  );

  // Set up WebSocket listeners
  useEffect(() => {
    const unsubscribeNewCall = onNewCall((data: Call) => {
      setCalls((prev) => {
        // Check if call already exists (avoid duplicates)
        const exists = prev.some((call) => call.id === data.id);
        if (exists) return prev;
        return [data, ...prev];
      });
    });

    const unsubscribeCallUpdate = onCallUpdate((data: any) => {
      if (data.deleted) {
        // Handle deletion
        setCalls((prev) => prev.filter((call) => call.id !== data.id));
      } else {
        // Handle update
        setCalls((prev) =>
          prev.map((call) => (call.id === data.id ? data : call))
        );
      }
    });

    return () => {
      unsubscribeNewCall();
      unsubscribeCallUpdate();
    };
  }, [onNewCall, onCallUpdate]);

  // Fetch calls on mount
  useEffect(() => {
    fetchCalls();
  }, [fetchCalls]);

  // Sort calls by creation time (newest first)
  const sortedCalls = [...calls].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return {
    calls: sortedCalls,
    isLoading,
    error,
    fetchCalls,
    createCall,
    updateCall,
    deleteCall,
  };
}
