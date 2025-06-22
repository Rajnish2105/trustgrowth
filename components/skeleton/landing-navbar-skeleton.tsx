import { Skeleton } from "@/components/ui/skeleton";

export default function LandingNavbarSkeleton() {
  return (
    <div className="fixed top-0 w-full z-50 bg-white/10 backdrop-blur-md border-b border-white/20">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo Skeleton */}
          <div className="flex items-center gap-4">
            <Skeleton className="w-12 h-12 rounded-full bg-gray-300" />
            <div className="space-y-2">
              <Skeleton className="h-6 w-32 bg-gray-300" />
              <Skeleton className="h-3 w-24 bg-gray-200" />
            </div>
          </div>

          {/* Mobile Menu Button Skeleton */}
          <div className="md:hidden">
            <Skeleton className="w-6 h-6 bg-gray-300" />
          </div>

          {/* Desktop Navigation Skeleton */}
          <div className="hidden md:flex items-center justify-between w-[64%]">
            {/* Navigation Links Skeleton */}
            <div className="flex items-center gap-8">
              <div className="space-y-2">
                <Skeleton className="h-5 w-28 bg-gray-300" />
                <Skeleton className="h-0.5 w-full bg-gray-400" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-5 w-24 bg-gray-300" />
                <Skeleton className="h-0.5 w-0 bg-gray-400" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-5 w-32 bg-gray-300" />
                <Skeleton className="h-0.5 w-0 bg-gray-400" />
              </div>
            </div>

            {/* Sign In Button Skeleton */}
            <Skeleton className="h-10 w-24 rounded-full bg-gray-300" />
          </div>
        </div>
      </div>
    </div>
  );
}
