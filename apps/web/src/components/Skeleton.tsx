export function Skeleton({ className = '' }: { className?: string }) {
  return (
    <div className={`animate-pulse bg-gray-300 rounded ${className}`} />
  );
}

export function InfoCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl p-5 border border-black/[0.01]">
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1">
          <Skeleton className="h-5 w-16 mb-2" />
          <Skeleton className="h-5 w-24" />
        </div>
        <div className="flex-1">
          <Skeleton className="h-5 w-16 mb-2" />
          <Skeleton className="h-5 w-32" />
        </div>
      </div>
    </div>
  );
}

