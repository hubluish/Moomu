import React from 'react';
import './P3_new.css';
import SectionTitle from '../sectionTitle/SectionTitle';
import f1 from '../../images/f_1.png';
import f2 from '../../images/f_2.png';
import f3 from '../../images/f_3.png';
import b1 from '../../images/b_1.png';
import b2 from '../../images/b_2.png';
import b3 from '../../images/b_3.png';

const P3 = () => {
  const features = [
    { id: 1 },
    { id: 2 },
    { id: 3 }
  ];

  const frontImages = { 1: f1, 2: f2, 3: f3 };
  const backImages  = { 1: b1, 2: b2, 3: b3 };
  const labels = { 1: 'data', 2: 'easy', 3: 'complete' };

  return (
    <section className="about-section">
  
      <SectionTitle category="why moomu">
        <div className="features">
          {features.map((feature, index) => (
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