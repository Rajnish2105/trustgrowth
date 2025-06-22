import { Skeleton } from "@/components/ui/skeleton";

export default function HomeSkeleton() {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-white via-gray-50 to-gray-100 overflow-hidden">
      {/* Main Slider Skeleton */}
      <div className="h-screen w-screen overflow-hidden">
        <div className="relative w-full h-full">
          {/* Single Slide Skeleton */}
          <div className="absolute inset-0 w-full h-full">
            <div className="flex items-center justify-center h-full w-full px-4 sm:px-6 lg:px-8 pt-20">
              <div className="w-full max-w-7xl mx-auto h-[80vh] rounded-3xl bg-gradient-to-br from-gray-200/40 via-gray-300/40 to-gray-400/40 backdrop-blur-sm border border-white/20 shadow-2xl overflow-hidden">
                {/* Gradient Overlay Skeleton */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-300/20 to-gray-400/20" />

                {/* Content Skeleton */}
                <div className="relative z-10 h-full flex items-center">
                  <div className="grid lg:grid-cols-2 gap-12 w-full p-8 md:p-12">
                    {/* Left Content Skeleton */}
                    <div className="flex flex-col justify-center space-y-6">
                      {/* Icon Badge Skeleton */}
                      <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-gray-300 to-gray-400 p-4 rounded-2xl w-fit shadow-lg">
                        <Skeleton className="w-6 h-6" />
                        <Skeleton className="w-32 h-4" />
                      </div>

                      {/* Title Skeleton */}
                      <div className="space-y-3">
                        <Skeleton className="h-12 md:h-14 lg:h-16 w-full" />
                        <Skeleton className="h-12 md:h-14 lg:h-16 w-3/4" />
                      </div>

                      {/* Description Skeleton */}
                      <div className="space-y-2">
                        <Skeleton className="h-6 w-full" />
                        <Skeleton className="h-6 w-5/6" />
                        <Skeleton className="h-6 w-4/5" />
                      </div>

                      {/* Button and Stats Skeleton */}
                      <div className="flex items-center space-x-6">
                        <Skeleton className="h-12 w-36 rounded-full" />
                        <div className="text-center space-y-1">
                          <Skeleton className="h-8 w-16" />
                          <Skeleton className="h-4 w-20" />
                        </div>
                      </div>
                    </div>

                    {/* Right Content Skeleton */}
                    <div className="flex flex-col justify-center space-y-6">
                      {/* Features Card Skeleton */}
                      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl">
                        <Skeleton className="h-7 w-32 mb-6" />
                        <div className="space-y-4">
                          {[1, 2, 3, 4, 5].map((item) => (
                            <div
                              key={item}
                              className="flex items-center space-x-3"
                            >
                              <Skeleton className="w-2 h-2 rounded-full" />
                              <Skeleton className="h-4 w-48" />
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Decorative Elements Skeleton */}
                      <div className="grid grid-cols-3 gap-4">
                        {[1, 2, 3].map((item) => (
                          <div
                            key={item}
                            className="bg-white/60 backdrop-blur-sm rounded-xl p-4 text-center shadow-lg"
                          >
                            <Skeleton className="w-6 h-6 mx-auto mb-2" />
                            <Skeleton className="h-4 w-16 mx-auto" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Slide Indicators Skeleton */}
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-50">
          {[1, 2, 3].map((item) => (
            <Skeleton
              key={item}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                item === 1 ? "scale-125" : ""
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
