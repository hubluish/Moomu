import React from "react";
import Image from "next/image";
import { StyledButton } from "./IconButton.styled";

type IconButtonProps = {
  onClick: () => void;
  src: string;
  alt: string;
  variant?: "default" | "danger" | "folder";
};

const IconButton = ({
  onClick,
  src,
  alt,
  variant = "default",
}: IconButtonProps) => {
  return (
    <StyledButton onClick={onClick} variant={variant}>
      <Image src={src} alt={alt} width={30} height={30} />
    </StyledButton>
  );
};

export default IconButton;
