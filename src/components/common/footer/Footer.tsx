import React, { useState } from 'react';
import './Footer.css';
import Image from 'next/image';

const Footer = () => {
  const footerSections = [
    {
      title: 'Moomu 소개',
      links: [
        { text: '시작하기', url: '/landing' },
        { text: 'Moomu 소개', url: '/about' }
      ]
    },
    {
      title: '학습 및 지원',
      links: [
        { text: '고객센터', url: '/support' },
        { text: '자주 묻는 질문', url: '/faq' }
      ]
    },
    {
      title: '제품',
      links: [
        { text: '요금', url: '/pricing' },
        { text: '환불 정책', url: '/refund-policy' }
      ]
    },
    {
      title: '왜 Moomu여야 할까요?',
      links: [
        { text: 'Moomu만의 차별성', url: '/features' }
      ]
    }
  ];

  const wrapMoomu = (text: string) => {
    if (typeof text !== 'string') return text;
    const parts = text.split(/(Moomu)/gi);
    return parts.map((part, idx) =>
      part.toLowerCase() === 'moomu' ? (
        <span key={idx} className="moomu-name">{part}</span>
      ) : (
        <span key={idx}>{part}</span>
      )
    );
  };

  const [showToast, setShowToast] = useState(false);
  const handleCopyEmail = () => {
    const email = 'yourmoomu@gmail.com';
    navigator.clipboard?.writeText(email);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="top-content">
        <div className="logo">Moomu</div>
        <a className="social-link" href="https://www.instagram.com/your_moomu/?igsh=NXdyc2N2ZjM5NW10#" target="_blank" rel="noreferrer noopener">
          <Image
            src="/assets/images/instaIcon.svg"
            alt="instagram"
            className="social-icon"
            width={25}
            height={25}
          />
          </a>
        </div>
      </div>

      {/* <div className="footer-divider" /> */}

      {/* <div className="footer-content">
        {footerSections.map((section, index) => (
          <div key={index} className="footer-section">
            <h4>{wrapMoomu(section.title)}</h4>
            {section.links.map((link, linkIndex) => (
              <a key={linkIndex} href={link.url}>{link.text}</a>
            ))}
          </div>
        ))}
      </div> */}

      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <a href="/privacy-policy" className="policy">개인정보 처리 방침</a>
          <span className="line" />
          <button type="button" className="email" onClick={handleCopyEmail} title="클릭하면 복사됩니다">이메일: yourmoomu@gmail.com</button>
          <span className="line" />
          <span className="copyright">© 2025, Moomu. All rights reserved.</span>
        </div>
      </div>
      <div className={`footer-toast${showToast ? '' : ' hide'}`}>복사되었습니다</div>
    </footer>
  );
};

export default Footer;
