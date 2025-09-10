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
  background: rgba(0, 0, 0, 0);
  position: relative;
`;

// 카테고리 칩들을 담는 컨테이너
export const CategoryContainer = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

// 개별 카테고리 칩
export const CategoryChip = styled.span`
  background-color: var(--color-background);
  color: var(--color-point);
  border: 0.5px solid var(--color-point);
  padding: 6px;
  border-radius: 16px;
  font-size: 14px;
  font-family: var(--font-family-base);
  font-weight: var(--font-weight-medium);
`;

// 썸네일 이미지를 감싸는 컨테이너
export const ImageWrapper = styled.div`
  flex-grow: 1;
  position: relative;
`;

export const OverlayWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 25px;
  border-radius: 20px;
  opacity: 0;
  transition: opacity 0.2s ease-in-out;

  ${MoodboardWrapper}:hover & {
    opacity: 1;
  }
`;

export const DateText = styled.span`
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  color: white;
  font-weight: var(--font-weight-medium);
`;

export const DeleteOptionsWrapper = styled.div`
  display: flex;
  gap: 10px;
  background-color: rgba(255, 255, 255, 0.9);
  padding: 8px 12px;
  border-radius: 20px;
  align-items: center;
`;

// folder 타입용 삭제 옵션 버튼
export const DeleteOptionButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 4px;

  &:hover {
    opacity: 0.7;
  }
`;

// favorite 타입용 작성자 이름
export const AuthorName = styled.span`
  position: absolute;
  bottom: 12px;
  left: 16px;
  color: white;
  font-size: 18px;
  font-weight: bold;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.7);
`;

// favorite 타입용 하트 아이콘
export const HeartIcon = styled.img`
  position: absolute;
  bottom: 12px;
  right: 16px;
  width: 28px;
  height: 28px;
  cursor: pointer;
`;
