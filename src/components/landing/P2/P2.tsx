import React from 'react';
import './P2.css';
import SectionTitle from '../sectionTitle/SectionTitle';

const P2 = () => {
  return (
    <section className="about-section">
      <SectionTitle category="about moomu">
        <h2 className="about-main-title">
          디자인의 시작은 <span className="highlight gradient-text">Moomu</span>가 도울게요
        </h2>
        
        <h3 className="about-sub-title" ><span className="about-description moomu-text gradient-text"> Moomu </span>  는</h3>
        <h3 className="about-sub-title"><span className="about-description infinity-text gradient-text">oo</span>한 당신의 아이디어가</h3>
        <h3 className="about-sub-title">
          아이디어에서 멈추지 않도록 돕기 위해 탄생했어요!
        </h3>
      </SectionTitle>
    </section>
  );
};

export default P2;
