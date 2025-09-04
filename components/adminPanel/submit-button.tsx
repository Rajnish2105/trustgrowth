"use client";

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export default function CallSubmitButton({isAdding}: {isAdding: boolean}) {
  return (
    <Button
      type="submit"
      disabled={isAdding}
      className="w-full bg-slate-300 hover:bg-slate-400 transition-colors duration-400"
    >
      {isAdding ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Adding Call...
        </>
      ) : (
        "Add Call"
      )}
    </Button>
  );
}
