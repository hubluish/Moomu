'use client';

import React from 'react';
import styles from './ShareButton.module.css';

type Props = {
    onCopyLink?: () => void;
    onShareKakao?: () => void;
};

export default function ShareButton({ onCopyLink, onShareKakao }: Props) {
    return (
        <div className={styles.container} role="group" aria-label="Share options">
        {/* Link 버튼 */}
        <button
            type="button"
            className={styles.btn}
            aria-label="Copy link"
            onClick={onCopyLink}
        >
            <div className={styles.linkIconWrap}>
            {/* 44 x 44 원 (흰색 42% + 연보라 스트로크) */}
            <svg
                className={styles.linkCircle}
                xmlns="http://www.w3.org/2000/svg"
                width="45"
                height="44"
                viewBox="0 0 45 44"
                fill="none"
                aria-hidden="true"
            >
                <circle cx="22.979" cy="22" r="22" fill="white" fillOpacity="0.42" />
                <circle
                cx="22.979"
                cy="22"
                r="21.9097"
                stroke="#3D38F5"
                strokeOpacity="0.1"
                strokeWidth="0.180556"
                />
            </svg>

            {/* 26 x 13 체인 아이콘 (FEFEFF) */}
            <svg
                className={styles.chainIcon}
                xmlns="http://www.w3.org/2000/svg"
                width="27"
                height="13"
                viewBox="0 0 27 13"
                fill="none"
                aria-hidden="true"
            >
                <path
                d="M19.5688 0H14.3688V2.6H19.5688C21.7138 2.6 23.4688 4.355 23.4688 6.5C23.4688 8.645 21.7138 10.4 19.5688 10.4H14.3688V13H19.5688C23.1568 13 26.0688 10.088 26.0688 6.5C26.0688 2.912 23.1568 0 19.5688 0ZM11.7688 10.4H6.56885C4.42385 10.4 2.66885 8.645 2.66885 6.5C2.66885 4.355 4.42385 2.6 6.56885 2.6H11.7688V0H6.56885C2.98085 0 0.0688477 2.912 0.0688477 6.5C0.0688477 10.088 2.98085 13 6.56885 13H11.7688V10.4ZM7.86885 5.2H18.2688V7.8H7.86885V5.2Z"
                fill="#FEFEFF"
                />
            </svg>
            </div>
            <span className={styles.label}>Link</span>
        </button>

        {/* KakaoTalk 버튼 */}
        <button
            type="button"
            className={styles.btn}
            aria-label="Share to KakaoTalk"
            onClick={onShareKakao}
        >
            <div className={styles.kakaoIconWrap}>
            {/* 카카오 말풍선 아이콘 (23 x 20, 흰색 + 흰색 스트로크 0.7) */}
            <svg
                className={styles.kakaoIcon}
                xmlns="http://www.w3.org/2000/svg"
                width="23"
                height="20"
                viewBox="0 0 25 22"
                fill="none"
                aria-hidden="true"
            >
                <path
                d="M12.5 0.719238C6.02614 0.719238 0.650596 5.00987 0.650391 10.4448C0.650391 15.8799 6.02601 20.1704 12.5 20.1704C13.6264 20.1727 14.7481 20.0407 15.8389 19.7788C16.6009 20.127 18.0528 20.6878 20.3086 21.1421L20.7959 21.2358C21.1399 21.2993 21.485 21.3578 21.8311 21.4106H21.832C22.3655 21.4902 22.8352 20.9617 22.5947 20.4341C22.4722 20.164 22.3604 19.8899 22.2578 19.6128L22.2549 19.606L22.252 19.5981L22.25 19.5913C21.9204 18.6997 21.6525 17.6861 21.5371 16.7358C23.2829 15.0483 24.3496 12.8534 24.3496 10.4448C24.3494 5.00987 18.9739 0.719238 12.5 0.719238ZM12.5 2.7583C18.1188 2.7583 22.2127 6.42427 22.2129 10.4448C22.2129 12.3002 21.3765 14.0365 19.9111 15.4058C19.7246 15.5803 19.5801 15.7927 19.4893 16.0288C19.3984 16.2652 19.3638 16.5187 19.3896 16.77V16.7729C19.4711 17.5028 19.6107 18.2256 19.8047 18.936C18.1681 18.5433 17.1509 18.1255 16.6729 17.8999C16.2836 17.7163 15.8371 17.6735 15.418 17.7778C14.4668 18.015 13.486 18.1347 12.501 18.1323H12.5L11.9775 18.1216C6.62906 17.9027 2.78711 14.3411 2.78711 10.4448C2.78732 6.42296 6.88117 2.7583 12.5 2.7583Z"
                fill="#FEFEFF"
                stroke="white"
                strokeWidth="0.7"
                />
            </svg>
            </div>
            <span className={styles.label}>KakaoTalk</span>
        </button>
        </div>
    );
}
