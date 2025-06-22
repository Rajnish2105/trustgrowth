import { Skeleton } from "@/components/ui/skeleton";

export default function AuctionSkeleton() {
  return (
    <section className="py-16 px-6 mt-20">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Text Skeletons */}
          <div className="space-y-6">
            <Skeleton className="h-12 w-full bg-gray-300" />
            <Skeleton className="h-12 w-5/6 bg-gray-300" />
            <Skeleton className="h-12 w-4/5 bg-gray-300" />

            <div className="space-y-3 pt-4">
              <Skeleton className="h-5 w-full bg-gray-200" />
              <Skeleton className="h-5 w-full bg-gray-200" />
              <Skeleton className="h-5 w-4/5 bg-gray-200" />
            </div>

            <Skeleton className="h-12 w-40 rounded-full bg-gray-300" />
          </div>

          {/* Right - Image Skeleton */}
          <div>
            <Skeleton className="w-full h-80 rounded-2xl bg-gray-300" />
          </div>
        </div>
      </div>
    </section>
  );
}
