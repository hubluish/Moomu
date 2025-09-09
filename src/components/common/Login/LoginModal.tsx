import React, { useState } from "react";
import { supabase } from "@/utils/supabase";
import Image from "next/image";
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
} from "./loginmodal.styled";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isLoginMode, setIsLoginMode] = useState(false);
  const [showVerificationMessage, setShowVerificationMessage] = useState(false);

  const validateEmail = (inputEmail: string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(inputEmail)) {
      setEmailError("@를 포함한 이메일 주소를 입력해 주세요");
      return false;
    } else {
      setEmailError("");
      return true;
    }
  };

  const validatePassword = (inputPassword: string) => {
    if (inputPassword.length < 8 || inputPassword.length > 16) {
      setPasswordError("8~16자리의 비밀번호를 입력해 주세요");
      return false;
    } else {
      setPasswordError("");
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
    ? email !== "" && password !== "" && !emailError && !passwordError
    : name !== "" &&
      email !== "" &&
      password !== "" &&
      !emailError &&
      !passwordError;

  const handleSubmit = async () => {
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);

    if (!isLoginMode && !name) {
      alert("이름을 작성해 주세요!");
      return;
    }

    if (!isEmailValid || !isPasswordValid) {
      alert("모든 항목을 올바르게 작성해 주세요!");
      return;
    }

    try {
      if (isLoginMode) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) {
          alert(`로그인 실패: ${error.message}`);
          return;
        }
        alert("로그인 성공!");
        onClose();
      } else {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { name: name },
          },
        });

        if (error) {
          alert(`회원가입 실패: ${error.message}`);
          return;
        }

        if (data.user) {
          const { error: profileError } = await supabase
            .from("profiles")
            .insert([{ id: data.user.id, name: name }]);

          if (profileError) {
            console.error("프로필 저장 실패:", profileError.message);
            alert(
              "회원가입은 성공했지만 프로필 저장에 실패했습니다. 다시 시도해 주세요."
            );
            return;
          }
        }

        setShowVerificationMessage(true);
      }
    } catch (error) {
      console.error("인증 오류:", error);
      alert("오류가 발생했습니다. 다시 시도해 주세요.");
    }
  };

  const toggleMode = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsLoginMode((prev) => !prev);
    setShowVerificationMessage(false);
    setName("");
    setEmail("");
    setPassword("");
    setEmailError("");
    setPasswordError("");
  };

  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin, // 현재 페이지로 리디렉션
      },
    });

    if (error) {
      alert(`구글 로그인 실패: ${error.message}`);
    }
  };

  const handleKakaoLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "kakao",
      options: {
        redirectTo: window.location.origin, // 현재 페이지로 리디렉션
      },
    });

    if (error) {
      alert(`카카오 로그인 실패: ${error.message}`);
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        {showVerificationMessage ? (
          <div style={{ textAlign: "center", padding: "20px", width: "393px" }}>
            <Title>이메일을 확인해 주세요!</Title>
            <p
              style={{
                color: "var(--color-text-main)",
                fontSize: "var(--font-body2)",
                marginBottom: "20px",
              }}
            >
              가입하신 이메일 주소로 인증 링크를 보냈습니다.
              <br />
              링크를 클릭하여 이메일 주소를 인증해 주세요.
            </p>
            <SignUpButton onClick={onClose} $isFormValid={true}>
              닫기
            </SignUpButton>
          </div>
        ) : (
          <>
            <Title>
              {isLoginMode
                ? "Log in to your mood!"
                : "Start your mood journey!"}
            </Title>

            {!isLoginMode && (
              <InputGroup>
                <Label htmlFor="name">Name</Label>
                <Input
                  type="text"
                  id="name"
                  placeholder="이름을 입력해 주세요"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
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
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="비밀번호를 입력해 주세요"
                  value={password}
                  onChange={handlePasswordChange}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSubmit();
                    }
                  }}
                  $hasError={!!passwordError}
                />
                <PasswordToggle
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? (
                    <Image
                      src="/assets/icons/eye-open.svg"
                      alt="Show password"
                      width={24}
                      height={24}
                    />
                  ) : (
                    <Image
                      src="/assets/icons/eye-closed.svg"
                      alt="Hide password"
                      width={24}
                      height={24}
                    />
                  )}
                </PasswordToggle>
              </PasswordInputWrapper>
              {passwordError && <ErrorMessage>{passwordError}</ErrorMessage>}
            </InputGroup>

            <Separator>or</Separator>

            <SocialLoginButtons>
              <SocialButton onClick={handleGoogleLogin}>
                <Image
                  src="/assets/icons/google.svg"
                  alt="Google"
                  width={54}
                  height={54}
                />
              </SocialButton>
              <SocialButton onClick={handleKakaoLogin}>
                <Image
                  src="/assets/icons/kakao.svg"
                  alt="Kakao"
                  width={54}
                  height={54}
                />
              </SocialButton>
            </SocialLoginButtons>

            <SignUpButton
              onClick={handleSubmit}
              disabled={!isFormValid}
              $isFormValid={isFormValid}
            >
              {isLoginMode ? "Login" : "Sign Up"}
            </SignUpButton>

            <LoginLinkWrapper>
              {isLoginMode
                ? "Don't have an account yet?"
                : "Already have an account?"}{" "}
              <a href="#" onClick={toggleMode}>
                {isLoginMode ? "Sign in" : "Login"}
              </a>
            </LoginLinkWrapper>
          </>
        )}
      </ModalContent>
    </ModalOverlay>
  );
};

export default LoginModal;
