import React, { ReactElement } from "react";
import { Skeleton } from "./Skeleton";

export interface SkeletonLoaderProps {
  status: "loading" | "error" | "success" | "idle";
  children?: React.ReactNode;
  type?: "normal" | "list" | "line";
  repeat?: number;
  error?: unknown;
  errorRender?: React.ReactElement;
}

export default function SkeletonLoader({
  status,
  children,
  repeat = 1,
  type = "normal",
  error,
  errorRender,
}: SkeletonLoaderProps): ReactElement {
  switch (status) {
    case "success":
      return errorRender ? errorRender : <>{children}</>;
    case "error":
      return <>Something went wrong</>;
    default:
      return (
        <div className="animate-pulse flex-shrink-0">
          <Skeleton type={type} repeat={repeat} />
        </div>
      );
  }
}
