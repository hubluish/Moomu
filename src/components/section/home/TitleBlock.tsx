import React from 'react';

interface TitleBlockProps {
  title: React.ReactNode;
  subtitle: React.ReactNode;
}

const TitleBlock: React.FC<TitleBlockProps> = ({ title, subtitle }) => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>{title}</h1>
      <p style={styles.subtitle}>{subtitle}</p>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    margin: '150px auto 0 auto',
    textAlign: 'center',
  },
  title: {
    color: '#000',
    fontFamily: 'Pretendard',
    fontSize: '45px',
    fontStyle: 'normal',
    fontWeight: 800,
    lineHeight: 'normal',
    marginBottom: '24px',
  },
  subtitle: {
    color: '#000',
    fontFamily: 'Pretendard',
    fontSize: '20px',
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight: 'normal',
    margin: 0,
  },
};

export default TitleBlock;
