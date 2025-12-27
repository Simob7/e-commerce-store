// app/product/[id]/loading.js
export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* 1. Breadcrumb Skeleton */}
      <div className="h-4 w-48 bg-gray-200 rounded animate-pulse mb-8" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* 2. Gallery Skeleton */}
        <div className="space-y-4">
          <div className="aspect-square bg-gray-100 rounded-[2.5rem] animate-pulse" />
          <div className="flex gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="w-20 h-20 bg-gray-100 rounded-xl animate-pulse"
              />
            ))}
          </div>
        </div>

        {/* 3. Info Skeleton */}
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="h-4 w-24 bg-gray-100 rounded animate-pulse" />
            <div className="h-10 w-3/4 bg-gray-200 rounded animate-pulse" />
            <div className="h-6 w-1/4 bg-gray-100 rounded animate-pulse" />
          </div>
          <div className="h-32 w-full bg-gray-50 rounded-2xl animate-pulse" />
          <div className="flex gap-4">
            <div className="h-14 w-32 bg-gray-100 rounded-2xl animate-pulse" />
            <div className="h-14 flex-1 bg-gray-200 rounded-2xl animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}
