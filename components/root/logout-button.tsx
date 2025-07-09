"use client";

import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

export default function LogoutButton() {
  return (
    <Button
      onClick={() => signOut({ callbackUrl: "/" })}
      variant="outline"
      className="bg-white hover:bg-gray-50"
    >
      <LogOut className="w-4 h-4 mr-2" />
      LogOut
    </Button>
  );
}
