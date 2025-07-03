import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-4 ">
      <div className="max-w-4xl mx-auto px-4">
        {/* Mobile-first responsive layout */}
        <div className="flex flex-col items-center gap-4 md:flex-row md:justify-between md:items-end">
          {/* Logo and branding section */}
          <div className="flex items-center justify-center gap-4">
            <div className="w-10 h-10 relative flex-shrink-0">
              <Image
                src="/images/logo.png"
                alt="Trust Growth Logo"
                width={40}
                height={40}
                className="object-contain"
              />
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Trust Growth
              </h1>
              <p className="text-sm text-gray-300 font-serif italic -mt-1">
                Growth with Trust
              </p>
            </div>
          </div>

          {/* Copyright section */}
          <div className="text-center md:text-right md:mb-3">
            <p className="text-gray-400 text-sm">&copy; 2024 Trust Growth.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
