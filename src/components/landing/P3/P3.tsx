import React from 'react';
import './P3.css';
import SectionTitle from '../sectionTitle/SectionTitle';

const P3 = () => {
  const features = [
    { id: 1 },
    { id: 2 },
    { id: 3 }
  ];

  // 이미지 경로를 public/assets/images 폴더 기준으로 수정
  const frontImages: { [key: number]: string } = { 
    1: '/assets/images/f_1.png', 
    2: '/assets/images/f_2.png', 
    3: '/assets/images/f_3.png' 
  };
  const backImages: { [key: number]: string } = { 
    1: '/assets/images/b_1.png', 
    2: '/assets/images/b_2.png', 
    3: '/assets/images/b_3.png' 
  };
  const labels: { [key: number]: string } = { 
    1: 'data', 
    2: 'easy', 
    3: 'complete' 
  };

  return (
    <section className="about-section">
      <SectionTitle category="why moomu">
        <div className="features">
          {features.map((feature) => (
            <div key={feature.id} className="feature-card">
              <div className="card-inner">
                {/* Front Side (Image) */}
                <div className="card-front">
                  <div className="card-media">
                    <img className="card-image" src={frontImages[feature.id]} alt={`card ${feature.id} front`} />
                  </div>
                </div>

                {/* Back Side (Image) */}
                <div className="card-back">
                  <div className="card-media">
                    <img className="card-image" src={backImages[feature.id]} alt={`card ${feature.id} back`} />
                  </div>
                </div>
              </div>
              <span className="card-caption">{labels[feature.id]}</span>
            </div>
          ))}
        </div>
      </SectionTitle>
    </section>
  );
};

export default P3;
