"use client";
import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 80px 20px;
  background-color: var(--color-background, #fefeff);
  min-height: 100vh;
`;

export const FormContainer = styled.form`
  width: 100%;
  max-width: 700px;
  background-color: #fff;
  border: 2px solid var(--color-outline, #e6e8ec);
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
`;

export const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: var(--color-main, #3d38f5);
  text-align: center;
  margin-bottom: 32px;
`;

export const Subtitle = styled.p`
  font-size: 1rem;
  font-weight: 400;
  color: var(--color-text-sub, #6b7280);
  text-align: center;
  margin-bottom: 32px;
  white-space: pre-line;
`;

export const FormGroup = styled.div`
  margin-bottom: 24px;
`;

export const Label = styled.label`
  display: block;
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-text-main, #1c1c1e);
  margin-bottom: 8px;

  &:after {
    content: " *";
    color: var(--color-main, #3d38f5);
  }

  &.optional:after {
    content: " (선택)";
    color: var(--color-text-sub, #6b7280);
    font-weight: 400;
  }
`;

export const Textarea = styled.textarea`
  width: 100%;
  min-height: 120px;
  padding: 12px;
  font-size: 1rem;
  border: 2px solid var(--color-outline, #e6e8ec);
  border-radius: 8px;
  resize: none;

  &:focus {
    outline: none;
    border-color: var(--color-point, #7b68ee);
  }
`;

export const SubmitButton = styled.button`
  width: 100%;
  padding: 16px;
  font-size: 1.1rem;
  font-weight: 700;
  color: white;
  background-color: var(--color-main, #3d38f5);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover:not(:disabled) {
    background-color: var(--color-main-hover, #251fc1);
  }

  &:disabled {
    background-color: var(--color-notice, #f1f3f5);
    color: var(--color-text-sub, #6b7280);
    cursor: not-allowed;
  }
`;

export const ErrorMessage = styled.p`
  color: #f73a32;
  margin-top: 10px;
  text-align: center;
`;

export const SuccessMessage = styled.div`
  text-align: center;
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--color-main, #3d38f5);
`;

// --- 별점 스타일 ---
export const StarRatingContainer = styled.div`
  display: flex;
  gap: 8px;
`;

export const StarInput = styled.input`
  display: none;
`;

export const StarLabel = styled.label<{ $isActive: boolean }>`
  font-size: 2.5rem;
  color: ${({ $isActive }) => ($isActive ? "#FFC107" : "#E0E0E0")};
  cursor: pointer;
  transition: color 0.2s;
`;
