"use client";

import React from "react";
import Image from "next/image";
import {
  MoodboardWrapper,
  CategoryContainer,
  CategoryChip,
  ImageWrapper,
} from "./moodboard.styled";
import MoodboardOverlay from "./MoodboardOverlay";

type MoodboardProps = {
  id: string;
  imageUrl: string | null;
  keywords: string[];
  date: string;
  type: "mymoodboard" | "folder" | "favorite" | "trash";
};

const Moodboard = ({ id, imageUrl, keywords, date, type }: MoodboardProps) => {
  const displayImage = imageUrl || "/assets/images/sky.png";

  return (
    <MoodboardWrapper>
      <CategoryContainer>
        {keywords
          .filter((keyword) => keyword)
          .map((keyword, index) => (
            <CategoryChip key={index}>{keyword}</CategoryChip>
          ))}
      </CategoryContainer>

      <ImageWrapper>
        <Image
          src={displayImage}
          alt="무드보드 썸네일"
          width={311}
          height={138}
          style={{
            objectFit: "cover",
            borderRadius: "8px",
          }}
        />
      </ImageWrapper>

      <MoodboardOverlay type={type} moodboardId={id} date={date} />
    </MoodboardWrapper>
  );
};

export default Moodboard;
