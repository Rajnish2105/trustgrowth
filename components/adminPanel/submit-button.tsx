import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";

export default function CallSubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      className="w-full md:w-auto bg-slate-700"
      disabled={pending}
    >
      {pending ? (
        <span className="flex items-center">
          <svg className="animate-spin h-4 w-4 mr-2" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8z"
            />
          </svg>
          Submitting...
        </span>
      ) : (
        <>
          <Plus className="w-4 h-4 mr-2" />
          Add Call
        </>
      )}
    </Button>
  );
}
