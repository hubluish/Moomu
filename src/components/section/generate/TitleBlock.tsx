import React from 'react';
import styles from './TitleBlock.module.css';

interface TitleBlockProps {
  title: string;
  subtitle: string;
}

const TitleBlock: React.FC<TitleBlockProps> = ({ title, subtitle }) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title} dangerouslySetInnerHTML={{ __html: title }} />
      <p className={styles.subtitle} dangerouslySetInnerHTML={{ __html: subtitle }} />
    </div>
  );
};

export default TitleBlock;
