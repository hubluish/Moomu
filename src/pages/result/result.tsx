import MoodboardTitle from '../../components/result/MoodboardTitle';
import Chips from '../../components/result/Chips';
import ActionButtons from '../../components/result/ActionButtons';
import ConceptBox from '../../components/result/ConceptBox';
import FontBox from '../../components/result/FontBox';
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
        <ConceptBox />
        <FontBox />
        </main>
    );
}
