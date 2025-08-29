'use client';

import React from 'react';
import styles from './KeywordBox.module.css';

interface KeywordBoxProps {
    tags: string[];
}

const KeywordBox: React.FC<KeywordBoxProps> = ({ tags }) => {
    return (
        <div className={styles.container}>
        <div className={styles.title}>KEYWORD</div>
        <div className={styles.chipContainer}>
            {tags.map((tag, index) => (
            <div key={index} className={styles.chip}>
                {tag}
            </div>
            ))}
        </div>
        </div>
    );
};

export default KeywordBox;
