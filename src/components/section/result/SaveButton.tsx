'use client';

import React from 'react';
import styles from './SaveButton.module.css';

interface SaveButtonProps {
    onClick?: () => void;
}

const SaveButton: React.FC<SaveButtonProps> = ({ onClick }) => {
    return (
        <button className={styles.button} onClick={onClick}>
            <span className={styles.text}>완료 및 저장</span>
        </button>
    );
};

export default SaveButton;
