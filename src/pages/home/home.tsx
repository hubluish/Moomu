'use client';

import React, {useEffect, useState} from 'react';
import { useRouter } from 'next/navigation';
import styles from './home.module.css';
import PopAlert from '../../components/section/home/PopAlert';
import ColorOption from '../../components/section/home/ColorOption';
import TitleBlock from '../../components/section/home/TitleBlock';
import NextButton from '../../components/section/home/NextButton';
import PreviousButton from '../../components/section/home/PreviousButton';
import ProgressBar from '../../components/section/home/ProgressBar';
import MoodOption from '../../components/section/home/MoodOption';
import TagGuideModal from '../../components/section/home/TagGuideModal';

const stepContents = [
    {
        title: '어떤 색상이 들어가면 좋을까요?',
        subtitle: <>컬러는 무드의 시작이에요. 마음을 끄는 색을 골라보세요.<br/>처음 떠오른 색이 정답일 수 있어요 !</>,
        options: [
        { title: 'Monotone', description: 'Neutral tones that keep it simple and clean.' },
        { title: 'Warm', description: 'Cozy and inviting, with soft earthy tones.' },
        { title: 'Cool', description: 'Refreshing blues for a calming mood.' },
        { title: 'Vivid', description: 'Bold and bright colors that pop.' },
        { title: 'Pastel', description: 'Soft and sweet, like a spring day.' },
        { title: 'Dark', description: 'Deep, moody tones with strong presence.' },
        ],
    },
    {
        title: <>이 무드를 사진으로 표현한다면<br /> 어떤 모습인가요?</>,
        subtitle: 'Define the vibe of your moodboard by selecting emotional tags.',
        options: [
        { title: 'Energetic', description: 'Full of life and movement.' },
        { title: 'Romantic', description: 'Soft, dreamy, and heartfelt.' },
        { title: 'Minimal', description: 'Sleek, simple, and modern.' },
        { title: 'Retro', description: 'Nostalgic, old-school flavor.' },
        { title: 'Nature', description: 'Organic, earthy, and natural.' },
        
        ],
    
    },
    {
        title: '텍스트는 어떤 느낌인가요?',
        subtitle: 'Select additional styles for fonts and image concepts',
        options: [
        { title: 'Cafe', description: 'Warm and cozy corners with coffee aroma.' },
        { title: 'Studio', description: 'Creative and raw energy all around.' },
        { title: 'Park', description: 'Open skies and peaceful nature.' },
        { title: 'Room', description: 'Personal, quiet and reflective.' },
        ],
    },
    {
        title: '마지막으로, 무드보드를 완성시킬 요소가 있을까요?',
        subtitle: 'Select additional styles for fonts and image concepts.',
        options: [
        { title: 'Cafe', description: 'Warm and cozy corners with coffee aroma.' },
        { title: 'Studio', description: 'Creative and raw energy all around.' },
        { title: 'Park', description: 'Open skies and peaceful nature.' },
        { title: 'Room', description: 'Personal, quiet and reflective.' },
        ],
    },
];


function Home() {
    const [step, setStep] = useState(1);
    const router = useRouter();
    const [selections, setSelections] = useState<(string | null)[]>([null, null, null, null]);
    const content = stepContents[step - 1];
    const [showAlert, setShowAlert] = useState(false);
    const [showModal, setShowModal] = useState(false);

    

    useEffect(() => {
    const timer = setTimeout(() => {
        setShowModal(true);
        }, 10000);

        return () => clearTimeout(timer); // step 바뀌면 타이머 초기화
    }, [step]);

    const handleNext = () => {
        if (!selections[step - 1]) {
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 1000);
        return;
        }

        if (step < 4) {
            setStep(step + 1);
        } else {
        // JSON 생성
        const jsonResult = {
        색상: selections[0],
        폰트: selections[2],
        '이미지/감정': [selections[1], selections[3]].filter(Boolean),
        };
        console.log('✅ 선택된 결과:', jsonResult);
        router.push('/home/loading');
    }
    };

        const handleSelect = (option: string) => {
        setSelections(prev => {
        const updated = [...prev];
        updated[step - 1] = prev[step - 1] === option ? null : option; // 선택 취소 가능
        return updated;
        });
    };

    const goToFeed = () => {
    router.push('/feed'); // ✅ 원하는 피드 경로로 수정
    };

    return (
        <main>
            <ProgressBar step={step}/>
            <PopAlert visible={showAlert} />
            <TitleBlock title={content.title} subtitle= {content.subtitle}/>
            <NextButton onClick={handleNext} variant={step < 4 ? 'black' : 'gradient'} />
            <PreviousButton onClick={() => setStep(step > 1 ? step - 1 : step)} />
                <div className={styles.gridContainer}>
                {step === 1 ? (
                    <div className={styles.grid3columns}>
                        {content.options.map((opt, index) => (
                        <ColorOption
                            key={index}
                            title={opt.title}
                            description={opt.description}
                            isSelected={selections[0] === opt.title}
                            onClick={() => handleSelect(opt.title)}
                        />
                        ))}
                    </div>
                ) : (
                    <div className={styles.grid2x2}>
                        {content.options.map((opt, index) => (
                            <MoodOption
                                key={index}
                                title={opt.title}
                                subtitle={opt.description}
                                isSelected={selections[step - 1] === opt.title}
                                onClick={() => handleSelect(opt.title)}
                            />
                        ))}
                    </div>
                )}
            </div>
            {showModal && (
                <div className={styles.modalOverlay}>
                <TagGuideModal
                    onClose={() => setShowModal(false)}
                    onConfirm={goToFeed}
                />
                </div>
            )}
        </main>
    );
}

export default Home;
