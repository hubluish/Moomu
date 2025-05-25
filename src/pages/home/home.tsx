'use client';

import React, {useState} from 'react';
import styles from './home.module.css';
import ColorOption from '../../components/section/home/ColorOption';
import TitleBlock from '../../components/section/home/TitleBlock';
import Button from '../../components/section/home/Button';
import ProgressBar from '../../components/section/home/ProgressBar';

function Hello() {
    const [step, setStep] = useState(1);

    const handleNext = () => {
        if (step < 4) {
            setStep(step + 1);
        }
    };

    return (
        <main>
            <ProgressBar step={step}/>
            <TitleBlock
                title={<>이 무드를 사진으로 표현한다면<br/> 어떤 모습인가요?</>}
                subtitle="Choose your favorite tone to match your style."
            />
            <Button variant="black" onClick={handleNext}/>
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
