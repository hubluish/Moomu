'use client';

import React from 'react';
import styles from './ColorPaletteBox.module.css';

const dummyColors = ['#333333', '#555555', '#777777', '#999999'];

export default function ColorPaletteBox() {
    return (
        <div className={styles.container}>
            <div className={styles.title}>COLOR</div>
            <div className={styles.content}>
                {dummyColors.map((color) => (
                    <div
                        key={color}
                        className={styles.colorBlock}
                        style={{ backgroundColor: color }}
                    >
                        <span className={styles.colorCode}>{color}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
