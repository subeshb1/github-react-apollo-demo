import React from 'react';
import { SkeletonLoaderProps } from './SkeletonLoader';

export function Skeleton({
  type,
  repeat,
}: Required<
  Omit<SkeletonLoaderProps, 'status' | 'children' | 'errorRender' | 'error'>
>) {
  let SkeletonRender: React.ComponentType = NormalSkeleton;
  switch (type) {
    case 'line':
      SkeletonRender = LineSkeleton;
      break;
    default:
      SkeletonRender = NormalSkeleton;
  }
  return (
    <>
      {Array.from({ length: repeat }, (_, i) => (
        <SkeletonRender key={i} />
      ))}
    </>
  );
}
const NormalSkeleton = () => (
  <div className="flex flex-row items-center  space-x-5 m-4 z-0 overflow-hidden">
    <div className="w-12  flex-shrink-0 max-w-[calc(100%-48px)] bg-gray-300 h-12 rounded-full "></div>
    <div className="flex flex-shrink-0 flex-col space-y-3 ">
      <div className="w-96 max-w-[calc(100%-84px)] bg-gray-300 h-6 rounded-md "></div>
      <div className="w-44 max-w-[calc(100%-84px)] bg-gray-300 h-6 rounded-md "></div>
    </div>
  </div>
);
const widths = ['w-96', 'w-72', 'w-52', 'w-44'];
const LineSkeleton = () => {
  return (
    <div
      className={`${
        widths[(Math.random() * widths.length) | 0]
      } m-4  max-w-[calc(100%-38px)] bg-gray-300  h-6 rounded-md z-0 `}
    ></div>
  );
};
