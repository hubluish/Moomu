import React from 'react';
import './P1.css';

const P1 = () => {
  const imageGradients = [
    'linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%)',
    'linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%)',
    'linear-gradient(135deg, #45b7d1 0%, #96c93d 100%)',
    'linear-gradient(135deg, #f9ca24 0%, #f0932b 100%)',
    'linear-gradient(135deg, #eb4d4b 0%, #6c5ce7 100%)',
    'linear-gradient(135deg, #a29bfe 0%, #74b9ff 100%)',
    'linear-gradient(135deg, #fd79a8 0%, #fdcb6e 100%)',
    'linear-gradient(135deg, #6c5ce7 0%, #a29bfe 100%)',
    'linear-gradient(135deg, #00b894 0%, #00cec9 100%)',
    'linear-gradient(135deg, #e17055 0%, #ff7675 100%)'
  ];

  const renderImageCard = (gradient, index) => (
    <div key={index} className="image-card">
      <div 
        className="image-placeholder" 
        style={{ background: gradient }}
      ></div>
    </div>
  );

  return (
    <section className="P1">
      <div className="P1-title-container">
        <div className="p1-subtitle">
          누구나 디자인을 쉽게
        </div>
        <div className="p1-title">
          Moomu
        </div>
      </div>
      
      <div className="image-gallery">
        <div className="gallery-container">
          {/* 첫 번째 세트 */}
          {imageGradients.map((gradient, index) => renderImageCard(gradient, index))}
          {/* 무한 순환을 위한 두 번째 세트 */}
          {imageGradients.map((gradient, index) => renderImageCard(gradient, index + 10))}
        </div>
      </div>

      <div className="p1-description">
        <div className="p1-description-container">
          <p className="description">무한한 아이디어를 시각화하는 무드보드 제작 서비스, Moomu</p>
        </div>

      <div className="BtnContainer gradient-button">
        <button className="BtnText gradient-button">지금 바로 시작하기</button>
      </div>
            </div>
    </section>
  );
};

export default P1;