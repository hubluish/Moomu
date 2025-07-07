import styles from './ColorPalette.module.css';

const dummyColors = ['#333333', '#555555', '#777777', '#999999'];

export default function ColorPalette() {
    return (
        <div className={styles.container}>
        {dummyColors.map((color) => (
            <div key={color} className={styles.colorBlock} style={{ backgroundColor: color }}>
            <span className={styles.colorCode}>{color}</span>
            </div>
        ))}
        </div>
    );
    }
