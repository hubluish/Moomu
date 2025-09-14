import React, { useState, useRef, useEffect, useCallback } from 'react';
import Header from '@/components/common/header/header';
import BackButton from '../../components/section/result/BackButton';
import ActionButtons from '@/components/section/result/ActionButtons';
import ShareButton from '@/components/section/result/ShareButton';
import { useRouter } from "next/router";

import MoodboardPreview from '@/components/section/result/MoodboardPreview';
import { supabase } from '@/utils/supabaseClient';
import styles from './save.module.css';

export default function SavePage() {

    const router = useRouter();
    const [showShare, setShowShare] = useState(false);
    const shareBtnRef = useRef<HTMLDivElement>(null);

    // ESC로 공유 패널 닫기
    useEffect(() => {
        if (!showShare) return;
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setShowShare(false);
        };
        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, [showShare]);

    // 바깥 클릭(터치/펜 포함) 시 닫기
    useEffect(() => {
        if (!showShare) return;
        const onPointer = (e: Event) => {
            if (
                shareBtnRef.current &&
                !shareBtnRef.current.contains(e.target as Node)
            ) {
                setShowShare(false);
            }
        };
        document.addEventListener('pointerdown', onPointer as EventListener);
        return () => document.removeEventListener('pointerdown', onPointer as EventListener);
    }, [showShare]);

    const handleToggleShare = useCallback(() => setShowShare(prev => !prev), []);

    const handleBack = useCallback(async () => {
        // 1) Try to delete the just-created moodboard by mid
        try {
            let mid: string | null = null;
            if (typeof window !== 'undefined') {
                const sp = new URLSearchParams(window.location.search);
                mid = sp.get('mid');
            }
            if (mid) {
                const { error } = await supabase.from('moodboard').delete().eq('id', mid);
                if (error) {
                    console.error('Failed to delete moodboard:', error);
                }
            }
        } catch (e) {
            console.error('Error deleting moodboard:', e);
        }

        // 2) Navigate back to result with a safe rid
        try {
            const ref = typeof document !== 'undefined' ? document.referrer : '';
            let rid: string | null = null;
            if (ref) {
                try {
                    const url = new URL(ref);
                    rid = url.searchParams.get('rid');
                } catch {}
            }
            if (!rid && typeof window !== 'undefined') {
                try {
                    rid = window.localStorage.getItem('last_request_id');
                } catch {}
            }
            if (rid) {
                router.push(`/result/result?rid=${encodeURIComponent(rid)}`);
                return;
            }
        } catch {}
        if (typeof window !== 'undefined' && window.history.length > 1) {
            router.back();
        } else {
            router.push('/result/result');
        }
    }, [router]);

    // Clipboard API 실패 시 textarea fallback 제공
    const handleCopyLink = useCallback(async () => {
        const url = window.location.href;
        try {
            if (navigator?.clipboard?.writeText) {
                await navigator.clipboard.writeText(url);
                alert('링크가 클립보드에 복사되었습니다.');
                return;
            }
        } catch {}
        try {
            const textarea = document.createElement('textarea');
            textarea.value = url;
            textarea.style.position = 'fixed';
            textarea.style.opacity = '0';
            document.body.appendChild(textarea);
            textarea.focus();
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
            alert('링크가 클립보드에 복사되었습니다.');
        } catch (e) {
            alert('링크 복사에 실패했어요.');
        }
    }, []);

    const handleShareKakao = useCallback(() => {
        alert('카카오톡 공유는 준비 중이에요.');
    }, []);

    return (
        <main className={styles.pageBg}>
            <Header />
            <div className={styles.topWrapper}>
                {/* 이전 페이지로 돌아가기. 특정 경로로 이동하려면 push 유지 */}
                <BackButton onClick={handleBack} />
            </div>
            <div className={styles.mainContainer}>
                <div className={styles.content}>
                    <h1>하나뿐인 무드보드가 완성되었어요</h1>
                    <p>지금 바로 저장하고 멋진 디자인을 만들어요!</p>
                </div>
                <div className={styles.actionButtons}>
                    <div style={{ display: 'inline-block', position: 'relative' }} ref={shareBtnRef}>
                        <ActionButtons
                            // TODO: 이미지 저장/피드 게시 기능 구현 필요
                            onSaveImage={() => { alert('이미지 저장 기능은 준비 중이에요.'); }}
                            onPostFeed={() => { alert('피드 게시 기능은 준비 중이에요.'); }}
                            onShare={handleToggleShare}
                        />
                        {showShare && (
                            <div
                                className={styles.shareContainer}
                                onClick={e => e.stopPropagation()}
                                role="dialog" aria-modal="true" aria-label="공유 옵션"
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

