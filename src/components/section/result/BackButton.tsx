'use client';

import React from 'react';
import styles from './BackButton.module.css';

interface BackButtonProps {
    onClick?: () => void;
}

const BackButton: React.FC<BackButtonProps> = ({ onClick }) => {
    return (
        <button className={styles.button} onClick={onClick}>
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="39"
            height="39"
            viewBox="0 0 39 39"
            fill="none"
        >
            <circle
            cx="19.5"
            cy="19.5"
            r="19.4097"
            fill="white"
            fillOpacity="0.12"
            stroke="url(#paint0_linear_3363_2779)"
            strokeWidth="0.180556"
            />
            <defs>
            <linearGradient
                id="paint0_linear_3363_2779"
                x1="19.5"
                y1="0"
                x2="19.5"
                y2="39"
                gradientUnits="userSpaceOnUse"
            >
                <stop stopColor="#C5C2FF" />
                <stop offset="1" stopColor="white" stopOpacity="0.8" />
            </linearGradient>
            </defs>
        </svg>

        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="21"
            viewBox="0 0 22 21"
            fill="none"
            className={styles.arrow}
        >
            <path
            d="M15 4L7 10.5L15 17"
            stroke="#F1F3F5"
            strokeWidth="4"
            strokeLinecap="square"
            />
        </svg>
        </button>
    );
};

export default BackButton;
