import styles from './PopAlert.module.css';

interface PopAlertProps {
    visible: boolean;
    top?: number;
    zIndex?: number;
    screenWidth: number;
}

export default function PopAlert({ visible, top=70, zIndex=1002, screenWidth }: PopAlertProps) {
    const message = screenWidth <= 480 ? (
        <><strong>1개 이상</strong>의 태그를 선택해주세요!</>
    ) : (
        <>정확한 결과를 위해 <strong>1개 이상</strong>의 태그를 선택해주세요!</>
    );

    return (
        <div
        className={`${styles.alertContainer} ${visible ? styles.alertVisible : styles.alertHidden}`}
        style={{ top, zIndex }}
        role="status"
        aria-live="polite"
        >
        <div className={styles.wrapper}>
            <div className={styles.icon}>
                <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none">
                    <g clipPath="url(#clip0_1235_1104)">
                    <path d="M10.5771 2.13465C15.0729 2.13465 18.7309 5.79267 18.7309 10.2885C18.7309 14.7843 15.0729 18.4423 10.5771 18.4423C6.08125 18.4423 2.42323 14.7843 2.42323 10.2885C2.42323 5.79267 6.08125 2.13465 10.5771 2.13465ZM10.5771 0.0961914C4.94786 0.0961914 0.384766 4.65929 0.384766 10.2885C0.384766 15.9177 4.94786 20.4808 10.5771 20.4808C16.2063 20.4808 20.7694 15.9177 20.7694 10.2885C20.7694 4.65929 16.2063 0.0961914 10.5771 0.0961914ZM11.5963 13.3462H9.55784V15.3847H11.5963V13.3462ZM9.55784 11.3077H11.5963L12.1059 5.19235H9.04823L9.55784 11.3077Z" fill="#3D38F5"/>
                    </g>
                    <defs>
                    <clipPath id="clip0_1235_1104">
                        <rect width="20.3846" height="20.3846" fill="white" transform="translate(0.384766 0.0961914)" />
                    </clipPath>
                    </defs>
                </svg>
            </div>
            <p className={styles.text}>
            {message}
            </p>
        </div>
        </div>
    );
}
