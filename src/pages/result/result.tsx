import MoodboardTitle from '../../components/result/MoodboardTitle';
import Chips from '../../components/result/Chips';
import ActionButtons from '../../components/result/ActionButtons';
import styles from './result.module.css';
import React from 'react';

export default function ResultPage() {
    return (
        <main>
        <MoodboardTitle />
        <div className={styles.topWrapper}>
            <div className={styles.chips}>
                <Chips tags={['Pastel', 'Minimal', 'handwritten', 'Dreamy']} />
            </div>
            <div className={styles.actionsWrapper}>
                <div className={styles.actions}>
                    <ActionButtons />
                </div>
            </div>
        </div>
        </main>
    );
}
