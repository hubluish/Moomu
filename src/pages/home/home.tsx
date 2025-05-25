
import React from 'react';
import ColorOption from '../../components/section/home/ColorOption';
import TitleBlock from '../../components/section/home/TitleBlock';
import styles from './home.module.css';

function Hello() {
    return (
        <main>
            <TitleBlock
                title={<>이 무드를 사진으로 표현한다면<br/> 어떤 모습인가요?</>}
                subtitle="Choose your favorite tone to match your style."
            />
            <ColorOption
                title="Monotone"
                description="Neutral tones that keep it simple and clean."
            />
        </main>
    );
}

export default Hello;
