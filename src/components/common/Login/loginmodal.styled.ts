import styled from 'styled-components';

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

export const ModalContent = styled.div`
  display: flex;
  width: 455px;
  padding: 42px 32px;
  flex-direction: column;
  align-items: center;
  border-radius: 15.72px;
  background: var(--color-background);
`;

export const Title = styled.h2`
  background-image: linear-gradient(90deg, #3D38F5 50%, #FC45FF 95.49%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: var(--font-title2);
  font-weight: var(--font-weight-bold);
  margin-bottom: 30px;
  text-align: center;
  width: 100%;
`;

export const InputGroup = styled.div`
  width: 390px;
  margin-bottom: 22px;
`;

export const Label = styled.label`
  color: #333;
  font-size: var(--font-small);
  font-weight: 600;
  margin-bottom: 10px;
  display: block;
`;

export const ErrorMessage = styled.p`
  color: #FF6062;
  font-size: 13px;
  margin-top: 5px;
  margin-bottom: 0px;
`;

export const Input = styled.input<{ $hasError?: boolean }>`
  width: 100%;
  padding: 15px;
  border: 1px solid ${({ $hasError }) => ($hasError ? '#FF6062' : '#ddd')};
  border-radius: 8px;
  font-size: 1rem;
  background-color: #f7f7f7;

  transition: border 0.2s ease;

  &:focus {
    outline: none;
    border: 1px solid ${({ $hasError }) => ($hasError ? '#FF6062' : 'var(--color-main)')};
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
    content: '';
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
  background: none;
  border: 1px solid #eee;
  border-radius: 50%;
  width: 54px;
  height: 54px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  img {
    width: 54px;
    height: 54px;
  }
`;

export const SignUpButton = styled.button<{ $isFormValid: boolean }>`
  width: 100%;
  padding: 1rem;
  background: ${({ $isFormValid }) => ($isFormValid ? 'var(--color-main)' : 'var(--color-disable-button)')};
  color: white;
  border: none;
  border-radius: 10px;
  font-size: var(--font-body1);
  font-weight: var(--font-weight-bold);
  cursor: ${({ $isFormValid }) => ($isFormValid ? 'pointer' : 'not-allowed')};
  transition: background-color 0.2s ease;

  &:hover {
    background: ${({ $isFormValid }) => ($isFormValid ? 'var(--color-main-hover)' : 'var(--color-disable-button)')};
  }
`;

export const LoginLinkWrapper = styled.div`
  width: 100%;
  text-align: center;
  margin-top: 30px;
  font-size: var(--font-small);

  a {
    color: #6C24F0;
    text-decoration: none;
    font-weight: 600;

    &:hover {
      text-decoration: underline;
    }
  }
`;
