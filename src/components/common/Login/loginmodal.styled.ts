import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const moveDot = keyframes`
  0%, 100% {
    transform: translateX(10px);
  }
  25% {
    transform: translateX(40px);
  }
  50% {
    transform: translateX(65px);
  }
  75% {
    transform: translateX(90px);
  }
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const ModalContainer = styled.div`
  background: var(--color-background);
  border-radius: 15.72px;
  display: flex;
  height: 630px;
  position: relative;
  overflow: hidden;

  animation: ${fadeIn} 0.4s ease-out;

  @media (max-width: 375px) {
    width: 90%;
  }
`;

export const TitleContent = styled.div`
  display: flex;
  width: 455px;
  height: 100%;
  padding: 42px 32px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  z-index: 2;

  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(167, 164, 255, 0.1),
    inset 0 -1px 0 rgba(167, 164, 255, 0.1),
    inset 0 0 30px 15px rgba(167, 164, 255, 0.2);

  background: linear-gradient(
    180deg,
    rgba(167, 164, 255, 0.3),
    transparent,
    rgba(167, 164, 255, 0.2)
  );
  backdrop-filter: blur(2px) hue-rotate(5deg);
  -webkit-backdrop-filter: blur(2px) hue-rotate(5deg);
  border-right: 1px solid rgba(167, 164, 255, 0.1);

  @media (max-width: 375px) {
    display: none;
  }
`;

export const ModalContent = styled.div`
  display: flex;
  width: 455px;
  height: 100%;
  padding: 42px 32px;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media (max-width: 375px) {
    width: 100%;
    padding: 32px 24px;
  }
`;

export const BackgroundText = styled.div`
  position: absolute;
  top: 18%;
  transform: rotate(11.125deg);

  font-family: var(--font-family-logo);
  font-size: 130px;
  font-weight: bold;
  line-height: 252.293px;
  letter-spacing: -12px;

  background: linear-gradient(
    180deg,
    rgba(61, 56, 245, 0.7) 49.04%,
    rgba(208, 188, 220, 0.7) 100%
  );
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  z-index: 1;

  user-select: none;
  -webkit-user-select: none;

  @media (max-width: 375px) {
    display: none;
  }
`;

export const Title = styled.h2`
  background-image: linear-gradient(
    180deg,
    #3d38f5 0%,
    #786af8 65.38%,
    #9b87f9 100%
  );

  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  font-size: var(--font-title1);
  font-weight: var(--font-weight-bold);
  line-height: 50px;
  text-align: left;
  justify-content: center;
  width: 100%;
  margin-top: 40px;

  position: relative;
  z-index: 2;

  white-space: pre-line;

  user-select: none;
  -webkit-user-select: none; /* Safari/Chrome */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* IE */

  position: relative;
`;

export const MovingDot = styled.div`
  position: absolute;
  bottom: 45px;
  left: 0;
  width: 6px;
  height: 6px;
  background-color: #786af8;
  border-radius: 50%;
  animation: ${moveDot} 3s ease-in-out infinite;
`;

export const InputGroup = styled.div`
  width: 390px;
  margin-bottom: 22px;

  @media (max-width: 375px) {
    width: 100%;
  }
`;

export const Label = styled.label`
  color: #333;
  font-size: var(--font-small);
  font-weight: 600;
  margin-bottom: 10px;
  display: block;
`;

export const ErrorMessage = styled.p`
  color: #ff6062;
  font-size: 13px;
  margin-top: 5px;
  margin-bottom: 0px;
`;

export const Input = styled.input<{ $hasError?: boolean }>`
  width: 100%;
  padding: 15px;
  border: 1px solid ${({ $hasError }) => ($hasError ? "#FF6062" : "#ddd")};
  border-radius: 8px;
  font-size: 1rem;
  background-color: #f7f7f7;

  transition: border 0.2s ease;

  &:focus {
    outline: none;
    border: 1px solid
      ${({ $hasError }) => ($hasError ? "#FF6062" : "var(--color-main)")};
  }

  &::placeholder {
    color: #ccc;
  }
`;

export const PasswordInputWrapper = styled.div`
  position: relative;
  width: 100%;
`;

export const PasswordToggle = styled.span`
  position: absolute;
  right: 12px;
  top: 55%;
  transform: translateY(-50%);
  cursor: pointer;
  color: #999;
`;

export const Separator = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin: 21px 0;
  color: #999;

  &::before,
  &::after {
    content: "";
    flex: 1;
    border-bottom: 1px solid #eee;
  }

  &::before {
    margin-right: 1rem;
  }

  &::after {
    margin-left: 16px;
  }
`;

export const SocialLoginButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 22px;
  width: 100%;
  margin-bottom: 30px;
`;

export const SocialButton = styled.button`
  border: 1px solid #eee;
  border-radius: 50%;
  width: 54px;
  height: 54px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;

  img {
    width: 54px;
    height: 54px;
  }
`;

export const RecentLoginTooltip = styled.div`
  position: absolute;
  top: -40px; /* 아이콘 위로 40px */
  left: 50%;
  transform: translateX(-50%);
  background-color: #333;
  color: white;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 12px;
  white-space: nowrap;

  &::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: #333 transparent transparent transparent;
  }
`;

export const SignUpButton = styled.button<{ $isFormValid: boolean }>`
  width: 100%;
  padding: 13px;
  background: ${({ $isFormValid }) =>
    $isFormValid ? "var(--color-main)" : "var(--color-disable-button)"};
  color: white;
  border: none;
  border-radius: 10px;
  font-size: var(--font-body1);
  font-weight: var(--font-weight-bold);
  cursor: ${({ $isFormValid }) => ($isFormValid ? "pointer" : "not-allowed")};
  transition: background-color 0.2s ease;

  &:hover {
    background: ${({ $isFormValid }) =>
      $isFormValid ? "var(--color-main-hover)" : "var(--color-disable-button)"};
  }
`;

export const LoginLinkWrapper = styled.div`
  width: 100%;
  text-align: center;
  margin-top: 30px;
  font-size: var(--font-small);
  color: var(--color-text-sub, #6b7280);

  a {
    color: #6c24f0;
    text-decoration: none;
    font-weight: 600;

    &:hover {
      text-decoration: underline;
    }
  }
`;
