'use client';

import React from 'react';
import styles from './ExampleBox.module.css';
import Image from 'next/image';

export default function ExampleBox() {
    return (
        <div className={styles.container}>
            <div className={styles.title}>EXAMPLES</div>
            <div className={styles.comingSoonContainer}>
                <Image
                    src="/assets/icons/lock-icon.svg"
                    alt="Lock Icon"
                    width={48}
                    height={48}
                    className={styles.comingSoonIcon}
                />
                <p className={styles.comingSoonText}>기능 준비중입니다</p>
            </div>
        </div>
    );
}
