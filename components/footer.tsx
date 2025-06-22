import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-4">
      <div className="flex justify-between items-end w-full mx-auto px-6 text-center">
        <div className="w-16 h-full" />
        <div className="flex items-center justify-center gap-4 mb-2">
          <div className="w-10 h-10 relative">
            <Image
              src="/images/logo.png"
              alt="Trust Growth Logo"
              width={40}
              height={40}
              className="object-contain"
            />
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Trust Growth
            </h1>
            <p className="text-sm text-gray-300 font-serif italic -mt-1">
              Growth with Trust
            </p>
          </div>
        </div>
        <p className="text-gray-600 text-sm">&copy; 2024 Trust Growth.</p>
      </div>
    </footer>
  );
}
