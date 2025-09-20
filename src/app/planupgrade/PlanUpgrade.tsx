'use client';

import styles from './PlanUpgrade.module.css';
import FreeCard from '@/components/section/planupgrade/FreeCard';
import PaidCard from '@/components/section/planupgrade/PaidCard';

export default function PlanUpgrade() {
    return (
        <section className={styles.hero}>
        <h1 className={styles.title}>
            끝없는 당신의 아이디어를{' '}
            <span className={styles.wordWrap}>
            <span className={styles.word}>무한하게</span>
            <img
                className={styles.decoration}
                src="/assets/icons/logo_translucent.svg"
                alt=""
                aria-hidden="true"
            />
            </span>
        </h1>

        <p className={styles.subtitle}>
            더 많은 보드, 더 큰 영감, 무제한으로
        </p>

        <div className={styles.cardContainer}>
            <FreeCard />
            <PaidCard />
        </div>
    </section>
    );
}
