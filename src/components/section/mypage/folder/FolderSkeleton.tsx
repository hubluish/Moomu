import React from "react";
import {
  SkeletonWrapper,
  SkeletonIcon,
  SkeletonText,
} from "./FolderSkeleton.styled";

const FolderSkeleton = () => {
  return (
    <SkeletonWrapper>
      <SkeletonIcon />
      <SkeletonText />
    </SkeletonWrapper>
  );
};

type GridProps = {
  count?: number;
};

export const FolderGridSkeleton = ({ count = 6 }: GridProps) => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
        gap: "45px 28px",
      }}
    >
      {Array.from({ length: count }).map((_, index) => (
        <FolderSkeleton key={index} />
      ))}
    </div>
  );
};
