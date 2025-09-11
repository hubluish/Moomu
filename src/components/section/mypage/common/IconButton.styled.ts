import styled, { css } from "styled-components";

type ButtonVariant = "default" | "danger";

interface ButtonProps {
  variant?: ButtonVariant;
}

export const StyledButton = styled.button<ButtonProps>`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background-color 0.2s ease-in-out, transform 0.1s ease-in-out;

  ${({ variant }) =>
    variant === "danger"
      ? css`
          background-color: #fee2e2;
          &:hover {
            background-color: #fecaca;
          }
        `
      : css`
          background-color: #ebebff;
          &:hover {
            background-color: #c5c2ff;
          }
        `}

  &:active {
    transform: scale(0.95);
  }

  img {
    width: 24px;
    height: 24px;
  }
`;
