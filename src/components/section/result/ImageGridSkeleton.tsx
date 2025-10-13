import styles from './ImageGridSkeleton.module.css';

const ImageGridSkeleton = () => {
  return (
    <div className={styles.skeletonGrid}>
      {Array.from({ length: 9 }).map((_, index) => (
        <div key={index} className={styles.skeletonItem}></div>
      ))}
    </div>
  );
};

export default ImageGridSkeleton;
