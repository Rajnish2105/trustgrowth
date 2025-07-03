"use client";

import { useAuth, useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function FreeTrialButton() {
  const { isSignedIn } = useAuth();
  const clerk = useClerk();
  const router = useRouter();

  const handleClick = () => {
    if (isSignedIn) {
      router.push("/contact");
    } else {
      clerk.openSignIn();
    }
  };

  return (
    <button
      className="bg-white text-emerald-600 px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-semibold hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-sm sm:text-base"
      onClick={handleClick}
    >
      Start Free Trial
    </button>
  );
}
