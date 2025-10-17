import styles from './ColorOption.module.css';
import Image from 'next/image';
type ColorOptionProps = {
    title: string;
    description: string;
    colors: string[];
    isSelected?: boolean;
    onClick?: () => void;
};


export default function ColorOption({ title, description, colors, isSelected, onClick }: ColorOptionProps) {
    
    const imageUrl = `/data/images/color/${title.toLowerCase()}.jpg`;
    
    return (
        <div className={`${styles.container} ${isSelected ? styles.selected : ''}`} onClick={onClick}>
        <div className={styles.imageArea}>
            <Image
                src={imageUrl}
                alt={title}
                className={styles.image}
                fill
                sizes="100px"
            />
        </div>

        <div className={styles.infoArea}>
            <div className={`${styles.title} ${isSelected ? styles.selectedText : ''}`}>{title}</div>

        <div className={styles.colorPreviewWrapper}>
            <div className={styles.colorPreview}>
            {colors.map((color, index) => (
                <svg
                key={index}
                xmlns="http://www.w3.org/2000/svg"
                width="42"
                height="42"
                viewBox="0 0 42 42"
                fill="none"
                >
                <circle cx="21" cy="21" r="21" fill={color} />
                </svg>
            ))}
            </div>
        </div>
            <div className={`${styles.description} ${isSelected ? styles.selectedText : ''}`}>
                    {description}
            </div>
        </div>
        </div>
    );
}
