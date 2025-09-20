import React from "react";
import {
  SkeletonWrapper,
  SkeletonChipContainer,
  SkeletonChip,
  SkeletonImage,
} from "./MoodboardSkeleton.styled";

const MoodboardSkeleton = () => {
  return (
    <SkeletonWrapper>
      <SkeletonChipContainer>
        <SkeletonChip />
        <SkeletonChip />
        <SkeletonChip />
      </SkeletonChipContainer>
      <SkeletonImage />
    </SkeletonWrapper>
  );
};

type GridProps = {
  count?: number;
};

export const MoodboardGridSkeleton = ({ count = 6 }: GridProps) => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(332px, 1fr))",
        gap: "45px 28px",
      }}
    >
      {Array.from({ length: count }).map((_, index) => (
        <MoodboardSkeleton key={index} />
      ))}
    </div>
  );
};
