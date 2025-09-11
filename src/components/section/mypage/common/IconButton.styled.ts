import styled, { css } from "styled-components";

type ButtonVariant = "default" | "danger" | "folder";

interface ButtonProps {
  variant?: ButtonVariant;
}

export const StyledButton = styled.button<ButtonProps>`
  width: 56px;
  height: 56px;
  border: none;
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;

  transition: background-color 0.2s ease-in-out, transform 0.1s ease-in-out;

  ${({ variant }) => {
    if (variant === "danger") {
      return css`
        background-color: #fee2e2;
        border-radius: 50%;
        &:hover {
          background-color: #fecaca;
        }
      `;
    }

    if (variant === "folder") {
      return css`
        background-color: #ebebff;
        border-radius: 8px;
        border: 1px solid #e9ecef; /* 얇은 테두리 */
        width: 55px;
        height: 47px;
        &:hover {
          background-color: #e9ecef;
        }
      `;
    }

    return css`
      background-color: rgba(233, 231, 253, 0.9);
      border-radius: 50%;
      &:hover {
        background-color: rgba(220, 218, 250, 0.95);
      }
    `;
  }}

  &:active {
    transform: scale(0.95);
  }

  img {
    width: 30px;
    height: 30px;
  }
`;
