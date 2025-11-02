"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  FooterContainer,
  FooterTop,
  Logo,
  SocialLink,
  FooterBottom,
  BottomSection,
  Dot,
  PolicyText,
  EmailButton,
  CopyrightText,
  FooterToast,
} from "./Footer.styled";

const Footer = () => {
  const [showToast, setShowToast] = useState(false);
  const handleCopyEmail = () => {
    const email = "yourmoomu@gmail.com";
    navigator.clipboard?.writeText(email);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  return (
    <FooterContainer>
      <FooterTop>
        <Logo>Moomu</Logo>
        <SocialLink
          href="https://www.instagram.com/your_moomu/"
          target="_blank"
          rel="noreferrer noopener"
        >
          <Image
            src="/assets/images/instaIcon.svg"
            alt="instagram"
            className="social-icon" // SocialLink의 자식 선택자로 스타일 적용
            width={25}
            height={25}
          />
        </SocialLink>
      </FooterTop>

      <FooterBottom>
        <BottomSection>
          <PolicyText href="/privacy-policy">개인정보 처리 방침</PolicyText>
          <Dot />
        </BottomSection>

        <BottomSection>
          <EmailButton
            type="button"
            onClick={handleCopyEmail}
            title="클릭하면 복사됩니다"
          >
            이메일: yourmoomu@gmail.com
          </EmailButton>
          <Dot />
        </BottomSection>

        <BottomSection>
          <CopyrightText>© 2025, Moomu. All rights reserved.</CopyrightText>
        </BottomSection>
      </FooterBottom>

      <FooterToast $show={showToast}>복사되었습니다</FooterToast>
    </FooterContainer>
  );
};

export default Footer;
