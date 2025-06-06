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

import stepMeta from '../../../public/data/stepMeta.json';
import colorThemes from '../../../public/data/colorThemes.json';
import fontThemes from '../../../public/data/fontThemes.json';
import imageThemes from '../../../public/data/imageThemes.json';
import imagePriority from '../../../public/data/imagePriority.json';    


function Home() {
    const [step, setStep] = useState(1);
    const router = useRouter();
    const [selections, setSelections] = useState<(string | null)[]>([null, null, null, null]);
    const [showAlert, setShowAlert] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const meta = stepMeta[step - 1];

    const getStepContent = (): Array<{ title: string; description: string; colors?: string[] }> => {
        if (step === 1) return colorThemes;
        
        if (step === 2) {
            const selectedColor = selections[0]?.toLowerCase() || '';
            const priority = imagePriority[selectedColor as keyof typeof imagePriority] || [];

            const priorityOptions = imageThemes.filter(opt => priority.includes(opt.title));
            const remainingOptions = imageThemes.filter(opt => !priority.includes(opt.title));

            return [...priorityOptions, ...remainingOptions];
        }

        if (step === 3) return fontThemes;
        
        if (step === 4) {
            const tagUsedInStep2 = selections[1];
            return imageThemes.filter(opt => opt.title !== tagUsedInStep2);
        }
        
        return [];
    };

    const stepOptions = getStepContent();

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
            <TitleBlock title={meta.title} subtitle= {meta.subtitle}/>
            <NextButton onClick={handleNext} variant={step < 4 ? 'black' : 'gradient'} />
            <PreviousButton onClick={() => setStep(step > 1 ? step - 1 : step)} />
                <div className={styles.gridContainer}>
                {step === 1 ? (
                    <div className={styles.grid3columns}>
                        {stepOptions.map((opt: any, index: number) => (
                        <ColorOption
                            key={index}
                            title={opt.title}
                            description={opt.description}
                            colors={opt.colors}
                            isSelected={selections[0] === opt.title}
                            onClick={() => handleSelect(opt.title)}
                        />
                        ))}
                    </div>
                ) : (
                    <div className={styles.grid2x2}>
                        {stepOptions.map((opt: any, index: number) => (
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
