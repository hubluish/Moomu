import MoodboardTitle from '../../components/result/MoodboardTitle';
import Chips from '../../components/result/Chips';
import React from 'react';


export default function ResultPage() {
    return (
        <main>
        <MoodboardTitle />
        <Chips tags={['Pastel', 'Minimal', 'handwritten', 'Dreamy']} />
        </main>
    );
}
