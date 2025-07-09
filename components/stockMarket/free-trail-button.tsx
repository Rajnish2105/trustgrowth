"use client";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useState } from "react";
import AuthDialog from "../auth-modal/auth-dialog";

export default function FreeTrialButton() {
  const { data: session } = useSession();
  const user = session?.user;
  const router = useRouter();
  const [authOpen, setAuthOpen] = useState(false);

  const handleClick = () => {
    if (user) {
      router.push("/contact");
    } else {
      setAuthOpen(true);
    }
  };

  return (
    <>
      <button
        className="bg-white text-emerald-600 px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-semibold hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-sm sm:text-base"
        onClick={handleClick}
      >
        Start Free Trial
      </button>
      <AuthDialog isOpen={authOpen} onClose={() => setAuthOpen(false)} />
    </>
  );
}
