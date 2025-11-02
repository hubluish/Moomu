import React from "react";
import styles from "./ShareButton.module.css";
import Image from "next/image";

type ShareButtonProps = {
  linkImgSrc?: string;   // 예: "/images/share-link.png"
  kakaoImgSrc?: string;  // 예: "/images/share-kakao.png"
  onClickLink?: () => void;
  onClickKakao?: () => void;
  className?: string;
};

export default function ShareButton({
    linkImgSrc = "/data/images/icons/link.png",
    kakaoImgSrc = "/data/images/icons/kakaotalk.png",
    onClickLink,
    onClickKakao,
    className
    }: ShareButtonProps) {
    return (
        <div className={`${styles.container} ${className ?? ""}`} role="group" aria-label="Share options">
        {/* Link */}
        <div className={styles.item}>
            <button
            type="button"
            className={styles.iconButton}
            aria-label="Share as link"
            onClick={onClickLink}
            >
            <Image
                className={styles.iconImg}
                src={linkImgSrc}
                alt="Link icon"
                width={44}
                height={44}
            />
            </button>
            <span className={styles.label}>Link</span>
        </div>

        {/* KakaoTalk */}
        <div className={styles.item}>
            <button
            type="button"
            className={styles.iconButton}
            aria-label="Share via KakaoTalk"
            onClick={onClickKakao}
            >
            <Image
                className={styles.iconImg}
                src={kakaoImgSrc}
                alt="KakaoTalk icon"
                width={44}
                height={44}
            />
            </button>
            <span className={styles.label}>KakaoTalk</span>
        </div>
        </div>
    );
}
