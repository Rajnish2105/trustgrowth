"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Settings } from "lucide-react";

export default function AdminPageLink() {
  const pathname = usePathname();
  const { data: session, status } = useSession();

  // Don't show anything while loading
  if (status === "loading") {
    return null;
  }

  // Only show to admins and NOT on the admin page itself
  if (session?.user?.role === "ADMIN" && pathname !== "/admin") {
    return (
      <Link
        href="/admin"
        className="fixed bottom-6 right-6 z-50 group"
        title="Admin Panel"
      >
        <div className="flex items-center justify-center w-12 h-12 bg-gray-900 hover:bg-gray-800 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200">
          <Settings className="w-5 h-5" />
        </div>
      </Link>
    );
  }

  return null;
}
