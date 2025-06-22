"use client";

export default function AnimatedBackground() {
  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10 overflow-hidden">
      <div className="relative w-full h-full">
        {/* Floating shapes */}
        <div className="absolute w-16 h-16 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 opacity-10 top-1/5 left-1/10 animate-float"></div>
        <div className="absolute w-24 h-24 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 opacity-10 top-3/5 right-1/10 animate-float [animation-delay:1s]"></div>
        <div className="absolute w-12 h-12 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 opacity-10 top-4/5 left-1/5 animate-float [animation-delay:2s]"></div>
        <div className="absolute w-20 h-20 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 opacity-10 top-1/10 right-3/10 animate-float [animation-delay:3s]"></div>
        <div className="absolute w-28 h-28 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 opacity-10 top-2/5 left-1/2 animate-float [animation-delay:4s]"></div>
      </div>
    </div>
  );
}
