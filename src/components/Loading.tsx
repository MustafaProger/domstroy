export function Loading() {
  return (
    <div className="flex items-center justify-center min-h-[200px]">
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 border-4 border-secondary-200 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-transparent border-t-primary-500 rounded-full animate-spin"></div>
      </div>
    </div>
  );
}

export function SkeletonCard() {
  return (
    <div className="bg-white rounded-lg border border-secondary-200 overflow-hidden animate-pulse">
      <div className="w-full h-48 bg-secondary-200"></div>
      <div className="p-4 space-y-3">
        <div className="h-4 bg-secondary-200 rounded w-3/4"></div>
        <div className="h-3 bg-secondary-200 rounded w-full"></div>
        <div className="h-3 bg-secondary-200 rounded w-5/6"></div>
        <div className="h-8 bg-secondary-200 rounded mt-4"></div>
      </div>
    </div>
  );
}
