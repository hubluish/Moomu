import React from 'react';
import './Footer.css';
import instaIcon from '../../images/instaIcon.svg';

const Footer = () => {
  const footerSections = [
    {
      title: 'Moomu 소개',
      links: ['시작하기', 'Moomu 소개']
    },
    {
      title: '학습 및 지원',
      links: ['고객센터', '자주 묻는 질문']
    },
    {
      title: '제품',
      links: ['요금', '환불 정책']
    },
    {
      title: '왜 Moomu여야 할까요?',
      links: ['Moomu만의 차별성']
    }
  ];

  const wrapMoomu = (text) => {
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

  const handleCopyEmail = () => {
    const email = 'yourmoomu@gmail.com';
    navigator.clipboard?.writeText(email);
  };

  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="logo">Moomu</div>
        <a className="social-link" href="https://instagram.com" target="_blank" rel="noreferrer noopener">
          <img src={instaIcon} alt="instagram" className="social-icon" />
        </a>
      </div>

      <div className="footer-divider" />

      <div className="footer-content">
        {footerSections.map((section, index) => (
          <div key={index} className="footer-section">
            <h4>{wrapMoomu(section.title)}</h4>
            {section.links.map((link, linkIndex) => (
              <a key={linkIndex} href="#">{wrapMoomu(link)}</a>
            ))}
          </div>
        ))}
      </div>

      <div className="footer-bottom">
        <span className="policy">개인정보 처리 방침</span>
        <span className="dot" />
        <button type="button" className="email" onClick={handleCopyEmail} title="클릭하면 복사됩니다">이메일: yourmoomu@gmail.com</button>
        <span className="dot" />
        <span className="copyright">© 2025, Moomu. All rights reserved.</span>
      </div>
    </footer>
  );
};

export default Footer;