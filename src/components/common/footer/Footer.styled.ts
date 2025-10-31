import styled from "styled-components";

export const FooterContainer = styled.footer`
  padding: 32px 40px;
  border-radius: 30px 30px 0 0;
  opacity: 0.8;
  background: #f8f9fa;
  color: #000;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  cursor: url("/assets/images/cursor2.svg"), auto;
  margin: 0 auto;
`;

export const FooterTop = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  height: 71px;
`;

export const Logo = styled.div`
  color: #000;
  font-family: MuseoModerno;
  font-size: 28px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: -2.52px;
`;

export const SocialLink = styled.a`
  .social-icon {
    width: 25px;
    height: 25px;
    opacity: 0.9;
  }
`;

export const FooterBottom = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #000;
  font-size: 12px;
  border-top: 1px solid rgba(0, 0, 0, 0.12);
  padding: 25px 0;
`;

export const Dot = styled.span`
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.5);
  display: inline-block;
`;

export const PolicyText = styled.span`
  /* 특별한 스타일이 없으면 일반 span으로 사용해도 됩니다. */
`;

export const EmailButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  color: #000;
  font: inherit; /* 부모 요소의 폰트 상속 */
  cursor: pointer;
  text-decoration: none;
`;

export const CopyrightText = styled.span`
  /* 특별한 스타일이 없으면 일반 span으로 사용해도 됩니다. */
`;

export const FooterToast = styled.div<{ $show: boolean }>`
  position: fixed;
  left: 50%;
  bottom: 32px;
  background: #6d63ff;
  color: #fff;
  padding: 10px 24px;
  border-radius: 20px;
  font-size: 16px;
  z-index: 9999;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  pointer-events: none;

  opacity: ${({ $show }) => ($show ? 1 : 0)};
  transform: ${({ $show }) =>
    $show
      ? "translateX(-50%) translateY(0)"
      : "translateX(-50%) translateY(20px)"};
  transition: opacity 0.5s, transform 0.5s;
`;
