import styled, { keyframes } from "styled-components";

// 반짝이는 애니메이션 정의
const shimmer = keyframes`
  0% {
    background-position: -468px 0;
  }
  100% {
    background-position: 468px 0;
  }
`;

// 스켈레톤 무드보드 전체를 감싸는 Wrapper
export const SkeletonWrapper = styled.div`
  width: 332px;
  height: 200px;
  border-radius: 20px;
  background: #f6f7f8;
  padding: 10px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

// 애니메이션이 적용될 회색 배경
const SkeletonBase = styled.div`
  background: #e0e0e0;
  background-image: linear-gradient(
    to right,
    #e0e0e0 0%,
    #f0f0f0 20%,
    #e0e0e0 40%,
    #e0e0e0 100%
  );
  background-repeat: no-repeat;
  background-size: 800px 200px;
  animation: ${shimmer} 1.5s linear infinite;
  border-radius: 8px;
`;

// 카테고리 칩 스켈레톤
export const SkeletonChipContainer = styled.div`
  display: flex;
  gap: 10px;
`;

export const SkeletonChip = styled(SkeletonBase)`
  width: 70px;
  height: 25px;
  border-radius: 12px;
`;

// 이미지 스켈레톤
export const SkeletonImage = styled(SkeletonBase)`
  flex-grow: 1; /* 남은 공간을 모두 차지 */
`;
