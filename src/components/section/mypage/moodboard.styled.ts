// components/section/mypage/moodboard.styled.ts
import styled from 'styled-components';

export const MoodboardCard = styled.div`
  display: flex;
  flex-direction: column;
  width: 332px;
  height: 226px;
  border-radius: 10.706px;
  box-shadow: 0px 3.569px 3.569px rgba(0, 0, 0, 0.25);
  overflow: hidden;
`;

export const MoodboardSection = styled.div`
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
  position: relative;
  overflow: hidden;

  &:hover div {
    display: flex;  // MoodboardOverlay의 display
  }

  img {
    object-fit: cover;
  }
`;

export const TitleSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 15px;
  height: 45px;
  box-sizing: border-box;
  background: var(--color-background);
`;

export const Title = styled.span`
  font-family: var(--font-family-base);
  font-size: 16px;
  font-weight: var(--font-weight-medium);
  color: var(--color-text-main);
`;

export const DateText = styled.span`
  font-family: var(--font-family-base);
  font-size: 13px;
  font-weight: var(--font-weight-regular);
  color: var(--color-text-sub);
`;