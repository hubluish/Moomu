'use client';

import styles from './FreeCard.module.css';

type Props = {
    title?: string;               // ex) "FREE"
    isCurrent?: boolean;          // "현재 플랜" 배지 표시
    priceLabel?: string;          // ex) "₩0"
    description?: string;         // 줄바꿈 포함 가능
    ctaText?: string;             // ex) "무료로 시작하기"
    features?: string[];          // bullet 5개
    onClickCTA?: () => void;
};

export default function PaymentCard({
    title = 'FREE',
    isCurrent = true,
    priceLabel = '₩0', // 사용자가 "\0"라고 적었는데 실제 표기 의도는 '₩0'일 가능성이 높아 기본값을 이렇게 둠
    description = '당신의 디자인을 더 쉽게,\n무무를 시작하는 모든 사람을 위한 요금제입니다.',
    ctaText = '무료로 시작하기',
    features = [
        '하루 최대 무드보드 3회 생성',
        '최대 12개 무드보드 저장',
        '무드보드 새로고침 2회',
        '더 많은 피드 탐색',
        '아티클 제작',
    ],
    onClickCTA,
    }: Props) {
    return (
        <div className={styles.card}>
        <div className={styles.headerRow}>
            <h3 className={styles.planTitle}>{title}</h3>
            {isCurrent && (
            <div className={styles.badge}>
                <span className={styles.badgeText}>현재 플랜</span>
            </div>
            )}
        </div>

        <div className={styles.price}>{priceLabel}</div>

        <p className={styles.desc}>
            {description.split('\n').map((line, i) => (
            <span key={i}>
                {line}
                {i !== description.split('\n').length - 1 && <br />}
            </span>
            ))}
        </p>

        <button className={styles.cta} type="button" onClick={onClickCTA}>
            {ctaText}
        </button>

        <ul className={styles.features}>
            {features.map((text, idx) => (
            <li className={styles.featureItem} key={idx}>
                <CheckIcon />
                <span className={styles.featureText}>{text}</span>
            </li>
            ))}
        </ul>
        </div>
    );
}

function CheckIcon() {
    return (
        <svg
        className={styles.checkIcon}
        xmlns="http://www.w3.org/2000/svg"
        width="20" height="20" viewBox="0 0 20 20" fill="none"
        aria-hidden="true"
        >
        <path
            d="M7.95832 12.625L15.0208 5.5625C15.1875 5.39583 15.3819 5.3125 15.6042 5.3125C15.8264 5.3125 16.0208 5.39583 16.1875 5.5625C16.3542 5.72917 16.4375 5.92722 16.4375 6.15667C16.4375 6.38611 16.3542 6.58389 16.1875 6.75L8.54165 14.4167C8.37499 14.5833 8.18054 14.6667 7.95832 14.6667C7.7361 14.6667 7.54165 14.5833 7.37499 14.4167L3.79165 10.8333C3.62499 10.6667 3.54499 10.4689 3.55165 10.24C3.55832 10.0111 3.64527 9.81306 3.81249 9.64583C3.97971 9.47861 4.17777 9.39528 4.40665 9.39583C4.63554 9.39639 4.83332 9.47972 4.99999 9.64583L7.95832 12.625Z"
            fill="#8865F3"
        />
        </svg>
    );
}
