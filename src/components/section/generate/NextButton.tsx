import React from 'react';
import styles from './NextButton.module.css';

interface ButtonProps {
    variant: 'black' | 'gradient';
    onClick?: () => void;
    }

    const Button: React.FC<ButtonProps> = ({ variant, onClick }) => {
    const isGradient = variant === 'gradient';

    return (
        <button className={`${styles.button} ${isGradient ? styles.gradient : styles.black}`} onClick={onClick}>
        <span className={styles.text}>
            {isGradient ? '무드보드 만들기' : '다음으로'}
            {isGradient && (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                className={styles.icon}
            >
                <g clipPath="url(#clip0_1033_1195)">
                <path
                    d="M9.66667 17.8333L9.06467 16.207C8.276 14.0743 7.88167 13.008 7.1035 12.2298C6.32533 11.4517 5.259 11.0573 3.12633 10.2687L1.5 9.66667L3.12633 9.06467C5.259 8.276 6.32533 7.8805 7.1035 7.1035C7.88167 6.3265 8.276 5.259 9.06467 3.12633L9.66667 1.5L10.2687 3.12633C11.0573 5.259 11.4528 6.32533 12.2298 7.1035C13.0068 7.88167 14.0743 8.276 16.207 9.06467L17.8333 9.66667L16.207 10.2687C14.0743 11.0573 13.008 11.4517 12.2298 12.2298C11.4517 13.008 11.0573 14.0743 10.2687 16.207L9.66667 17.8333ZM19 22.5L18.7422 21.8035C18.4038 20.8888 18.2347 20.4315 17.9022 20.099C17.5685 19.7653 17.1112 19.5962 16.1965 19.259L15.5 19L16.1977 18.7422C17.1112 18.4038 17.5685 18.2347 17.901 17.9022C18.2347 17.5685 18.4038 17.1112 18.741 16.1965L19 15.5L19.2578 16.1965C19.5962 17.1112 19.7653 17.5685 20.0978 17.901C20.4315 18.2347 20.8888 18.4038 21.8035 18.741L22.5 19L21.8023 19.2578C20.8888 19.5962 20.4315 19.7653 20.099 20.0978C19.7653 20.4315 19.5962 20.8888 19.259 21.8035L19 22.5Z"
                    stroke="white"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                </g>
                <defs>
                <clipPath id="clip0_1033_1195">
                    <rect width="24" height="24" fill="white" transform="matrix(1 0 0 -1 0 24)" />
                </clipPath>
                </defs>
            </svg>
            )}
        </span>
        </button>
    );
};

export default Button;
