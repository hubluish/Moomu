
import React from 'react';
import ColorOption from '../../components/section/home/ColorOption';
import TitleBlock from '../../components/section/home/TitleBlock';
import styles from './home.module.css';
import Button from '../../components/section/home/Button';

function Hello() {
    return (
        <main>
            <TitleBlock
                title={<>이 무드를 사진으로 표현한다면<br/> 어떤 모습인가요?</>}
                subtitle="Choose your favorite tone to match your style."
            />
            <Button variant="black"/>
            <div className={styles.gridContainer}>
                <div className={styles.row}>
                    <ColorOption title="Monotone" description="Neutral tones that keep it simple and clean." />
                    <ColorOption title="Warm" description="Cozy and inviting, with soft earthy tones." />
                    <ColorOption title="Cool" description="Refreshing blues for a calming mood." />
                </div>
                <div className={styles.row}>
                    <ColorOption title="Vivid" description="Bold and bright colors that pop." />
                    <ColorOption title="Pastel" description="Soft and sweet, like a spring day." />
                    <ColorOption title="Dark" description="Deep, moody tones with strong presence." />
                </div>
            </div>

        </main>
    );
}

export default Hello;
