import { useFormStatus } from "react-dom";

export default function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-10 py-4 rounded-full font-semibold flex items-center gap-3 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <span>{pending ? "Sending..." : "Send Message"}</span>
      <i className="fas fa-paper-plane"></i>
    </button>
  );
}
