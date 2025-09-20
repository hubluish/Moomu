import React from 'react';
import './SectionTitle.css';

interface SectionTitleProps {
  children: React.ReactNode;
  category?: string;
}

const SectionTitle = ({ children, category }: SectionTitleProps) => {
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
