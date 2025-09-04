"use client";

import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { cn } from "@/lib/utils";

export default function LogoutButton({ className }: { className?: string }) {
  return (
    <Button
      variant="ghost"
      onClick={() => signOut({ callbackUrl: "/" })}
      className={cn("gap-2", className)}
      aria-label="Log out"
    >
      <LogOut className="h-4 w-4" />
      Logout
    </Button>
  );
}
