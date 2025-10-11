import Link from 'next/link';
import Image from 'next/image';
import styles from './ErrorDisplay.module.css';

interface ErrorDisplayProps {
    message: string;
}

export default function ErrorDisplay({ message }: ErrorDisplayProps) {
    return (
        <div className={styles.container}>
            <Image src="/assets/icons/error-cross.svg" alt="Error" width={64} height={64} className={styles.icon} />
            <h1 className={styles.title}>오류가 발생했습니다</h1>
            <p className={styles.message}>{message}</p>
            <Link href="/" className={styles.homeButton}>
                홈으로 돌아가기
            </Link>
        </div>
    );
}
