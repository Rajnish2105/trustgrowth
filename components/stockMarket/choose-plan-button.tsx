"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

type Plan = {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  color: string;
};

export default function ChoosePlanButton({ plan }: { plan: Plan }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    // Clean up when component unmounts
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="mt-auto">
      <button
        className={`w-full bg-gradient-to-r ${plan.color} text-white py-3 sm:py-4 rounded-xl font-semibold hover:shadow-lg hover:-translate-y-1 transition-all duration-300 text-sm sm:text-base`}
        onClick={() => setOpen(true)}
      >
        Choose {plan.name}
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black bg-opacity-70 transition-opacity"
            onClick={() => setOpen(false)}
          />
          {/* Modal */}
          <div className="relative z-10 bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 flex flex-col items-center">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-xl font-bold"
              onClick={() => setOpen(false)}
              aria-label="Close"
            >
              &times;
            </button>
            <div className="mb-6 mt-2 text-center">
              <div className="text-lg font-semibold mb-2">Notice</div>
              <div className="text-gray-700 text-base">
                We only accept payment through contact only for now.
              </div>
            </div>
            <div className="flex gap-3 w-full mt-4">
              <Link
                href="/contact"
                className="flex-1 bg-gradient-to-r from-purple-600 to-purple-800 text-white py-2 rounded-lg font-semibold text-center hover:shadow-lg transition-all duration-300"
                onClick={() => setOpen(false)}
              >
                Contact
              </Link>
              <button
                className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg font-semibold hover:bg-gray-300 transition-all duration-300"
                onClick={() => setOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
