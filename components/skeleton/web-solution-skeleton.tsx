import { Skeleton } from "@/components/ui/skeleton";

export default function WebSolutionsSkeleton() {
  return (
    <section className="py-16 px-6 mt-12">
      <div className="max-w-7xl mx-auto">
        {/* Main Heading Skeleton */}
        <div className="text-center mb-8">
          <Skeleton className="h-12 w-80 mx-auto mb-6 bg-gray-300" />

          {/* Description Skeleton */}
          <div className="max-w-4xl mx-auto space-y-3">
            <Skeleton className="h-5 w-full bg-gray-200" />
            <Skeleton className="h-5 w-5/6 mx-auto bg-gray-200" />
            <Skeleton className="h-5 w-4/5 mx-auto bg-gray-200" />
          </div>
        </div>

        {/* Services Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          {/* Service Card 1 */}
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <Skeleton className="w-16 h-16 rounded-full bg-gray-300" />
            </div>
            <Skeleton className="h-6 w-48 mx-auto bg-gray-300" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-full bg-gray-200" />
              <Skeleton className="h-4 w-3/4 mx-auto bg-gray-200" />
            </div>
          </div>

          {/* Service Card 2 */}
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <Skeleton className="w-16 h-16 rounded-full bg-gray-300" />
            </div>
            <Skeleton className="h-6 w-52 mx-auto bg-gray-300" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-full bg-gray-200" />
              <Skeleton className="h-4 w-2/3 mx-auto bg-gray-200" />
            </div>
          </div>

          {/* Service Card 3 */}
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <Skeleton className="w-16 h-16 rounded-full bg-gray-300" />
            </div>
            <Skeleton className="h-6 w-44 mx-auto bg-gray-300" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-full bg-gray-200" />
              <Skeleton className="h-4 w-4/5 mx-auto bg-gray-200" />
            </div>
          </div>

          {/* Service Card 4 */}
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <Skeleton className="w-16 h-16 rounded-full bg-gray-300" />
            </div>
            <Skeleton className="h-6 w-40 mx-auto bg-gray-300" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-full bg-gray-200" />
              <Skeleton className="h-4 w-3/5 mx-auto bg-gray-200" />
            </div>
          </div>

          {/* Service Card 5 */}
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <Skeleton className="w-16 h-16 rounded-full bg-gray-300" />
            </div>
            <Skeleton className="h-6 w-56 mx-auto bg-gray-300" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-full bg-gray-200" />
              <Skeleton className="h-4 w-2/3 mx-auto bg-gray-200" />
            </div>
          </div>

          {/* Service Card 6 */}
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <Skeleton className="w-16 h-16 rounded-full bg-gray-300" />
            </div>
            <Skeleton className="h-6 w-36 mx-auto bg-gray-300" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-full bg-gray-200" />
              <Skeleton className="h-4 w-3/4 mx-auto bg-gray-200" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
