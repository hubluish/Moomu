import styled from "styled-components";

// 무드보드 전체를 감싸는 컨테이너
export const MoodboardWrapper = styled.div`
  width: 332px;
  height: 200px;
  padding: 10px;
  gap: 10px;
  border-radius: 20px;
  border: 0.5px solid #c5c2ff;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 0 2.659px 2.659px 0 rgba(0, 0, 0, 0.25);
  box-sizing: border-box;
  background-color: #fff;
`;

// 카테고리 칩들을 담는 컨테이너
export const CategoryContainer = styled.div`
  padding: 0 0 10px 0;
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  border-bottom: 1px solid #e9ecef;
`;

// 개별 카테고리 칩
export const CategoryChip = styled.span`
  background-color: var(--color-background);
  color: var(--color-point);
  border: 0.5px solid var(--color-point);
  padding: 6px;
  border-radius: 16px;
  font-size: 14px;
  font-weight: 500;
`;

// 썸네일 이미지를 감싸는 컨테이너
export const ImageWrapper = styled.div`
  flex-grow: 1;
  position: relative;
`;
