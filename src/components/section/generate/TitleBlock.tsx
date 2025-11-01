import React from 'react';
import styles from './TitleBlock.module.css';

interface TitleBlockProps {
  title: React.ReactNode;
  subtitle: React.ReactNode;
}

const TitleBlock: React.FC<TitleBlockProps> = ({ title, subtitle }) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.subtitle}>{subtitle}</p>
    </div>
  );
};

export default TitleBlock;
