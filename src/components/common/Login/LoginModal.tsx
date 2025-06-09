import React, { useState } from 'react';
import {
  ModalOverlay,
  ModalContent,
  Title,
  InputGroup,
  Label,
  Input,
  PasswordInputWrapper,
  PasswordToggle,
  Separator,
  SocialLoginButtons,
  SocialButton,
  SignUpButton,
  LoginLinkWrapper,
  ErrorMessage,
} from './loginmodal.styled';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isLoginMode, setIsLoginMode] = useState(false);

  const validateEmail = (inputEmail: string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(inputEmail)) {
      setEmailError('@를 포함한 이메일 주소를 입력해 주세요');
      return false;
    } else {
      setEmailError('');
      return true;
    }
  };

  const validatePassword = (inputPassword: string) => {
    if (inputPassword.length < 8 || inputPassword.length > 16) {
      setPasswordError('8~16자리의 비밀번호를 입력해 주세요');
      return false;
    } else {
      setPasswordError('');
      return true;
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    validateEmail(newEmail);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    validatePassword(newPassword);
  };

  const isFormValid = isLoginMode
    ? email !== '' && password !== '' && !emailError && !passwordError
    : name !== '' && email !== '' && password !== '' && !emailError && !passwordError;

  const handleSubmit = () => {
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);

    if (!isLoginMode && !name) {
      alert('이름을 작성해 주세요!');
      return;
    }

    if (!isEmailValid || !isPasswordValid) {
      alert('모든 항목을 올바르게 작성해 주세요!');
      return;
    }

    if (isLoginMode) {
      alert('로그인 성공! (실제 로직은 구현되지 않음)');
    } else {
      alert('회원가입 성공! (실제 로직은 구현되지 않음)');
    }
    onClose();
  };

  const toggleMode = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsLoginMode(prev => !prev);
    setName('');
    setEmail('');
    setPassword('');
    setEmailError('');
    setPasswordError('');
  };

  if (!isOpen) {
    return null;
  }

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={e => e.stopPropagation()}>
        <Title>{isLoginMode ? 'Log in to your mood!' : 'Start your mood journey!'}</Title>

        {!isLoginMode && (
          <InputGroup>
            <Label htmlFor="name">Name</Label>
            <Input type="text" id="name" placeholder="이름을 입력해 주세요" value={name} onChange={e => setName(e.target.value)} />
          </InputGroup>
        )}

        <InputGroup>
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            id="email"
            placeholder="Name@example.com"
            value={email}
            onChange={handleEmailChange}
            $hasError={!!emailError}
          />
          {emailError && <ErrorMessage>{emailError}</ErrorMessage>}
        </InputGroup>

        <InputGroup>
          <Label htmlFor="password">Password</Label>
          <PasswordInputWrapper>
            <Input
              type={showPassword ? 'text' : 'password'}
              id="password"
              placeholder="비밀번호를 입력해 주세요"
              value={password}
              onChange={handlePasswordChange}
              $hasError={!!passwordError}
            />
            <PasswordToggle onClick={() => setShowPassword(prev => !prev)}>
              {showPassword ? (
                <img src="/assets/icons/eye-open.svg" alt="Show password" />
              ) : (
                <img src="/assets/icons/eye-closed.svg" alt="Hide password" />
              )}
            </PasswordToggle>
          </PasswordInputWrapper>
          {passwordError && <ErrorMessage>{passwordError}</ErrorMessage>}
        </InputGroup>

        <Separator>or</Separator>

        <SocialLoginButtons>
          <SocialButton>
            <img src="/assets/icons/google.svg" alt="Google" />
          </SocialButton>
          <SocialButton>
            <img src="/assets/icons/naver.svg" alt="Naver" />
          </SocialButton>
          <SocialButton>
            <img src="/assets/icons/kakao.svg" alt="Kakao" />
          </SocialButton>
        </SocialLoginButtons>

        <SignUpButton onClick={handleSubmit} disabled={!isFormValid} $isFormValid={isFormValid}>
          {isLoginMode ? 'Login' : 'Sign Up'}
        </SignUpButton>

        <LoginLinkWrapper>
          {isLoginMode ? "Don't have an account yet?" : "Already have an account?"}{ ' '}
          <a href="#" onClick={toggleMode}>
            {isLoginMode ? 'Sign in' : 'Login'}
          </a>
        </LoginLinkWrapper>
      </ModalContent>
    </ModalOverlay>
  );
};

export default LoginModal;
