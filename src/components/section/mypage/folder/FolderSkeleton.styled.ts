import styled, { keyframes } from "styled-components";

// 반짝이는 애니메이션 (기존 스켈레톤과 동일)
const shimmer = keyframes`
  0% { background-position: -468px 0; }
  100% { background-position: 468px 0; }
`;

// 스켈레톤 폴더 아이템 전체를 감싸는 Wrapper
export const SkeletonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
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
`;

// 폴더 아이콘 스켈레톤
export const SkeletonIcon = styled(SkeletonBase)`
  width: 180px;
  height: 180px;
  border-radius: 12px;
`;

// 폴더 이름 텍스트 스켈레톤
export const SkeletonText = styled(SkeletonBase)`
  width: 120px;
  height: 20px;
  border-radius: 4px;
`;

export const SkeletonItem = styled.div`
  width: 100%;
  height: 50px; /* FolderItem의 padding과 유사한 높이 */
  margin-bottom: 15px;
  border-radius: 8px;
  background-color: #f0f0f0; /* 기본 배경색 */
`;
