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

  user-select: none;
  -webkit-user-select: none; /* Safari/Chrome */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* IE */

  transition: background-color 0.2s ease-in-out, transform 0.1s ease-in-out;

  ${({ variant }) => {
    if (variant === "danger") {
      return css`
        background-color: #fee2e2;
        border-radius: 50%;
        &:hover {
          background-color: #ff6062;
        }
      `;
    }

    if (variant === "folder") {
      return css`
        background-color: #ebebff;
        border-radius: 8px;
        width: 58px;
        height: 46px;
        &:hover {
          background-color: #e9ecef;
        }
      `;
    }

    return css`
      background-color: #ebebff;
      border-radius: 50%;
      &:hover {
        background-color: #c5c2ff;
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
