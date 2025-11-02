import React, { useState, useEffect } from 'react';
import styles from './ImageGridSkeleton.module.css';

const ImageGridSkeleton = () => {
  const [numberOfItems, setNumberOfItems] = useState(9);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 480) {
        setNumberOfItems(8);
      } else {
        setNumberOfItems(9);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className={styles.skeletonGrid}>
      {Array.from({ length: numberOfItems }).map((_, index) => (
        <div key={index} className={styles.skeletonItem}></div>
      ))}
    </div>
  );
};

export default ImageGridSkeleton;
