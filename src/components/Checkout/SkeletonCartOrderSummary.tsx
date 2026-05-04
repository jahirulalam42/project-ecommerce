import React from "react";
import { Skeleton } from "../ui/skeleton";
import { Separator } from "../ui/separator";

const SkeletonCartOrderSummary = () => {
  return (
    <div>
      <div className="h-[108px] flex flex-col gap-4">
        <div className="relative w-full h-full grid grid-cols-5 gap-2">
          {/* Image placeholder */}
          <div className="col-span-1 relative h-full w-full">
            <Skeleton className="w-full h-full rounded-md" />
          </div>

          {/* Product info & quantity */}
          <div className="col-span-3 flex flex-col justify-between">
            <div className="flex flex-col gap-1">
              <Skeleton className="w-3/4 h-5" />
              <Skeleton className="w-1/2 h-4" />
            </div>
            <div className="w-[80px] h-[40px]">
              <div className="flex flex-row justify-center items-center gap-2 bg-gray-100 rounded-full">
                <Skeleton className="w-6 h-6 rounded-full" />
                <Skeleton className="w-4 h-5" />
                <Skeleton className="w-6 h-6 rounded-full" />
              </div>
            </div>
          </div>

          {/* Price column */}
          <div className="col-span-1 flex flex-col items-end gap-1">
            <Skeleton className="w-12 h-5" />
            <Skeleton className="w-10 h-4" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonCartOrderSummary;
