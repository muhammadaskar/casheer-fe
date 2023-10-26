import { Skeleton } from '../ui/skeleton';

const SkeletonForm = () => {
  return (
    <div className="space-y-9">
      <div className="flex flex-row space-x-5">
        <div className="flex flex-col w-full space-y-2">
          <Skeleton className="w-20 h-3 rounded-sm" />
          <Skeleton className="w-full h-6 rounded-sm" />
        </div>
        <div className="flex flex-col w-full space-y-2">
          <Skeleton className="w-11 h-3 rounded-sm" />
          <Skeleton className="w-full h-6 rounded-sm" />
        </div>
      </div>
      <div className="flex flex-col w-full space-y-2">
        <Skeleton className="w-20 h-3 rounded-sm" />
        <Skeleton className="w-full h-6 rounded-sm" />
      </div>
      <div className="flex flex-col w-full space-y-2">
        <Skeleton className="w-20 h-3 rounded-sm" />
        <Skeleton className="w-full h-6 rounded-sm" />
      </div>
      <div className="flex flex-col w-full space-y-2">
        <Skeleton className="w-20 h-3 rounded-sm" />
        <Skeleton className="w-full h-6 rounded-sm" />
      </div>
    </div>
  );
};

export default SkeletonForm;
