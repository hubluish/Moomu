'use client';

import React from 'react';
import styles from './Chips.module.css';

interface ChipsProps {
    tags: string[];
    }

    const Chips: React.FC<ChipsProps> = ({ tags }) => {
    return (
        <div className={styles.chipContainer}>
        {tags.map((tag, index) => (
            <div key={index} className={styles.chip}>
            {tag}
            </div>
        ))}
        </div>
    );
    };

export default Chips;
