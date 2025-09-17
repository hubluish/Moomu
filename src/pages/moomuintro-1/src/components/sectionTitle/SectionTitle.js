import React from 'react';
import './SectionTitle.css';

const SectionTitle = ({ children, category }) => {
  return (
    <section className="section-title">
      <div className="category">
        <div className="category-content">
          <span className="category-text">{category || 'about moomu'}</span>
        </div>
      </div>
      {children}
    </section>
  );
};

export default SectionTitle;