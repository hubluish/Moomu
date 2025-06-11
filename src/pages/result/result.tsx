import MoodboardTitle from '../../components/result/MoodboardTitle';
import Chips from '../../components/result/Chips';
import ActionButtons from '../../components/result/ActionButtons';
import ConceptBox from '../../components/result/ConceptBox';
import FontBox from '../../components/result/FontBox';
import ImageBox from '../../components/result/ImageBox';
import ColorPaletteBox from '../../components/result/ColorPaletteBox';
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
        <div className={styles.gridContainer}>
            <div className={styles.conceptBox}>
                <ConceptBox />
            </div>
            <div className={styles.fontBox}>
                <FontBox />
            </div>
            <div className={styles.imageBox}>
                <ImageBox />
            </div>
            <div className={styles.paletteBox}>
                <ColorPaletteBox />
            </div>
        </div>
        </main>
    );
}
