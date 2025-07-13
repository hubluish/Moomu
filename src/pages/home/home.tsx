'use client';

import React, {useEffect, useState} from 'react';
import { useRouter } from 'next/navigation';
import styles from './home.module.css';
import Header from '@/components/common/header/header';
import PopAlert from '../../components/section/home/PopAlert';
import ColorOption from '../../components/section/home/ColorOption';
import TitleBlock from '../../components/section/home/TitleBlock';
import NextButton from '../../components/section/home/NextButton';
import PreviousButton from '../../components/section/home/PreviousButton';
import ProgressBar from '../../components/section/home/ProgressBar';
import MoodOption from '../../components/section/home/MoodOption';
import TagGuideModal from '../../components/section/home/TagGuideModal';
import SeeMoreButton from '../../components/section/home/SeeMoreButton';
import {saveToSupabase} from '../../utils/saveToSupabase'

import stepMeta from '../../../public/data/stepMeta.json';
import colorThemes from '../../../public/data/colorThemes.json';
import fontThemes from '../../../public/data/fontThemes.json';
import imageThemes from '../../../public/data/imageThemes.json';
import imagePriority from '../../../public/data/imagePriority.json';    
import fontPriority from '../../../public/data/fontPriority.json';

interface Option {
    title: string;
    description: string;
    colors?: string[];
    key?: string;
}

function Home() {
    const [step, setStep] = useState(1);
    const router = useRouter();
    const [selections, setSelections] = useState<(string | null)[]>([null, null, null, null]);
    const [showAlert, setShowAlert] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showAllOptions, setShowAllOptions] = useState(false);

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

        if (step === 3) {
            const selectedColor = selections[0]?.toLowerCase() || '';
            const priority = (fontPriority as Record<string, string[]>)[selectedColor] || [];

            const priorityOptions = fontThemes.filter(opt => priority.includes(opt.title));
            const remainingOptions = fontThemes.filter(opt => !priority.includes(opt.title));

            return [...priorityOptions, ...remainingOptions];
        }

        if (step === 4) {
            const tagUsedInStep2 = selections[1];
            return imageThemes.filter(opt => opt.title !== tagUsedInStep2);
        }
        
        return [];
    };

    const stepOptions = getStepContent();
    const visibleOptions = showAllOptions
        ? stepOptions
        : step === 1
            ? stepOptions.slice(0, 6)
            : stepOptions.slice(0, 4);

    useEffect(() => {
    const timer = setTimeout(() => {
        setShowModal(true);
        }, 10000);

        return () => clearTimeout(timer); // step 바뀌면 타이머 초기화
    }, [step]);

    const handleNext = async () => {
        if (!selections[step - 1]) {
            setShowAlert(true);
            setTimeout(() => setShowAlert(false), 1000);
            return;
        }

        if (step < 4) {
            setStep(step + 1);
            setShowAllOptions(false);
        } else {
            const payload = {
            color: selections[0],
            font: selections[2],
            image: [selections[1], ...(selections[3]?.split(',') || [])]
                .filter(Boolean)
                .join(', '),
            };

            console.log('%c✅ Gemini 요청 payload:', 'color: blue; font-weight: bold;', payload);

            try {
            const response = await fetch('/api/gemini_proxy', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            const result = await response.json();
            console.log('%c🎨 Gemini 응답 결과:', 'color: green; font-weight: bold;', result);
            
            localStorage.setItem('gemini_result', JSON.stringify(result));

            console.log('%c💾 Supabase 저장 시작:', 'color: blue; font-weight: bold;');
            try {
                await saveToSupabase(result);
                console.log('%c✅ Supabase 저장 성공:', 'color: green; font-weight: bold;');
            } catch (error) {
                console.error('%c❌ Supabase 저장 실패:', 'color: red; font-weight: bold;', error);
            }
            router.push('/home/loading'); 
            } catch (error) {
            console.error('❌ Gemini 서버 호출 실패:', error);
            alert('Gemini API 요청에 실패했습니다.');
            }
        }
        };


    const handleSelect = (option: string) => {
        setSelections(prev => {
        const updated = [...prev];

        if (step === 4) {
            const current = updated[3]; // step 4의 인덱스는 3
            const selected = current ? current.split(',') : [];

            if (selected.includes(option)) {
                
                const filtered = selected.filter(item => item !== option);
                updated[3] = filtered.join(',') || null;
            } else {
                if (selected.length < 2) {
                    updated[3] = [...selected, option].join(',');
                } else {
                    return prev;
                }
            }

        } else {
            updated[step - 1] = prev[step - 1] === option ? null : option;
            for (let i = step; i < updated.length; i++) {
                updated[i] = null;
            }
        }
        
        return updated;
        });
    };

    return (
        <main>
            <Header />
            <ProgressBar step={step}/>
            <PopAlert visible={showAlert} />
            <TitleBlock title={meta.title} subtitle= {meta.subtitle}/>
            <NextButton onClick={handleNext} variant={step < 4 ? 'black' : 'gradient'} />
            <PreviousButton onClick={() => setStep(step > 1 ? step - 1 : step)} />
            <div className={styles.gridContainer}>
                {step === 1 ? (
                    <div className={styles.grid3columns}>
                        {visibleOptions.map((opt: Option, index: number) => (
                            <ColorOption
                                key={index}
                                title={opt.title}
                                description={opt.description}
                                colors={opt.colors || []}
                                isSelected={selections[0] === opt.title}
                                onClick={() => handleSelect(opt.title)}
                            />
                        ))}
                    </div>
                ) : (
                    <div className={styles.grid2x2}>
                        {visibleOptions.map((opt: Option, index: number) => (
                            <MoodOption
                                key={index}
                                title={opt.title}
                                subtitle={opt.description}
                                keyName={opt.key}
                                step={step}
                                isSelected={step===4? selections[3]?.split(',').includes(opt.title) : selections[step - 1] === opt.title}
                                onClick={() => handleSelect(opt.title)}
                            />
                        ))}
                    </div>
                )}
            </div>
            {!showAllOptions && stepOptions.length > 4 && (
                            <div className={styles.seeMoreWrapper}>
                                <SeeMoreButton onClick={() => setShowAllOptions(true)} />
                            </div>
            )}

            {showModal && (
                <div className={styles.modalOverlay}>
                    <TagGuideModal
                        onClose={() => setShowModal(false)}
                    />
                </div>
            )}
        </main>
    );
}

export default Home;
