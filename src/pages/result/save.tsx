import React, { useState, useRef, useEffect } from 'react';
import Header from '@/components/common/header/header';
import BackButton from '../../components/section/result/BackButton';
import ActionButtons from '@/components/section/result/ActionButtons';
import ShareButton from '@/components/section/result/ShareButton';
import { useRouter } from "next/router";

import MoodboardPreview from '@/components/section/result/MoodboardPreview';
import styles from './save.module.css';

export default function SavePage() {

    const router = useRouter();
    const [showShare, setShowShare] = useState(false);
    const shareBtnRef = useRef<HTMLDivElement>(null);

    // ESC로 닫기
    useEffect(() => {
        if (!showShare) return;
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setShowShare(false);
        };
        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, [showShare]);

    // 공유 버튼 외부 클릭 시 닫기 (오버레이 없이)
    useEffect(() => {
        if (!showShare) return;
        const onClick = (e: MouseEvent) => {
            if (
                shareBtnRef.current &&
                !shareBtnRef.current.contains(e.target as Node)
            ) {
                setShowShare(false);
            }
        };
        document.addEventListener('mousedown', onClick);
        return () => document.removeEventListener('mousedown', onClick);
    }, [showShare]);

    const handleOpenShare = () => setShowShare(true);
    const handleCloseShare = () => setShowShare(false);

    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(window.location.href);
            alert('링크를 클립보드에 복사했어요.');
        } catch (e) {
            alert('링크 복사에 실패했어요.');
        }
    };

    const handleShareKakao = () => {
        alert('카카오톡 공유는 준비 중이에요.');
    };

    return (
        <main className={styles.pageBg}>
            <Header />
            <div className={styles.topWrapper}>
                <BackButton onClick={() => router.push('/result/result')} />
            </div>
            <div className={styles.mainContainer}>
                <div className={styles.content}>
                    <h1>하나뿐인 무드보드가 완성되었어요</h1>
                    <p>지금 바로 저장하고 멋진 디자인을 만들어요!</p>
                </div>
                <div className={styles.actionButtons}>
                    <div style={{ display: 'inline-block', position: 'relative' }} ref={shareBtnRef}>
                        <ActionButtons
                            onSaveImage={() => { alert('이미지 저장 기능은 곧 제공될 예정입니다.'); }}
                            onPostFeed={() => { alert('피드 게시 기능은 곧 제공될 예정입니다.'); }}
                            onShare={handleOpenShare}
                        />
                        {showShare && (
                            <div
                                className={styles.shareContainer}
                                style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', top: '60px', zIndex: 100 }}
                                onClick={e => e.stopPropagation()}
                            >
                                <ShareButton onClickLink={handleCopyLink} onClickKakao={handleShareKakao} />
                            </div>
                        )}
                    </div>
                </div>
                <MoodboardPreview />
            </div>
        </main>
    );
}

