import { WebSocketProvider } from "@/contexts/WebSocketContext";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <WebSocketProvider>{children}</WebSocketProvider>;
}
