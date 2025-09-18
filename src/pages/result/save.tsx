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

    const [coverUrl, setCoverUrl] = useState<string | null>(null);
    const [loadingCover, setLoadingCover] = useState<boolean>(true);
    const coverRequestedRef = useRef<boolean>(false);

    useEffect(() => {
        const run = async () => {
        try {
            if (typeof window === 'undefined') return;
            const sp = new URLSearchParams(window.location.search);
            const mid = sp.get('mid');
            if (!mid) {
            setLoadingCover(false);
            return;
            }
            const { data, error } = await supabase
              .from('moodboard')
              .select('cover_image_url, images_json, palette_json, tags')
              .eq('id', mid)
              .single();

            if (error) {
              console.error('moodboard 불러오기 실패:', error);
            } else {
              const curUrl = data?.cover_image_url ?? null;
              setCoverUrl(curUrl);

              // 우리 스토리지에 생성된 커버가 아니면 생성 요청
              const supaBase = (process.env.NEXT_PUBLIC_SUPABASE_URL || '').replace(/\/?$/, '');
              const shouldGenerate = !curUrl
                || !/\/storage\/v1\/object\/public\/moodboard\//.test(String(curUrl))
                || !String(curUrl).toLowerCase().endsWith('.webp');

              if (!coverRequestedRef.current && shouldGenerate) {
                coverRequestedRef.current = true;
                try {
                  const thumbs = Array.isArray(data?.images_json)
                    ? data.images_json.map((img: any) => img?.thumb || img?.url).filter(Boolean).slice(0, 9)
                    : [];
                  const palette = Array.isArray(data?.palette_json)
                    ? data.palette_json.map((p: any) => p?.hex).filter(Boolean).slice(0, 4)
                    : [];
                  const categories = Array.isArray(data?.tags) ? data.tags.slice(0, 6) : [];

                  const res = await fetch('/api/generate-cover', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      boardId: mid,
                      categories,
                      thumbs,
                      palette,
                    }),
                  });
                  if (res.ok) {
                    const j = await res.json();
                    if (j?.cover_image_url) setCoverUrl(j.cover_image_url);
                  } else {
                    console.warn('generate-cover failed with status', res.status);
                  }
                } catch (e) {
                  console.warn('generate-cover error:', e);
                }
              }
            }
        } catch (e) {
            console.error('moodboard 조회 에러:', e);
        } finally {
            setLoadingCover(false);
        }
        };
        run();
    }, []);
    
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

    const handlePostFeed = useCallback(async () => {
  // 로그인 확인
    const { data: { user }, error: uerr } = await supabase.auth.getUser();
    if (uerr || !user) {
        alert("로그인이 필요합니다.");
        return;
    }

    // mid 가져오기 (방금 만든 moodboard id)
    const sp = new URLSearchParams(window.location.search);
    const mid = sp.get("mid");
    if (!mid) {
        alert("잘못된 접근입니다. (mid 없음)");
        return;
    }

    // moodboard 불러오기
    const { data: mb, error: mberr } = await supabase
        .from("moodboard")
        .select("id, request_id, owner_id, title, cover_image_url, tags")
        .eq("id", mid)
        .single();

    if (mberr || !mb) {
        console.error("moodboard 로드 실패:", mberr);
        alert("무드보드 정보를 불러오지 못했습니다.");
        return;
    }

    if (mb.owner_id !== user.id) {
        alert("본인 무드보드만 게시할 수 있습니다.");
        return;
    }

    // feed_posts payload 만들기
    // Supabase Auth의 사용자 메타데이터에서 표시 이름 추출
    const authorName =
        (user.user_metadata && (
          (user.user_metadata.full_name as string | undefined) ||
          (user.user_metadata.name as string | undefined) ||
          (user.user_metadata.display_name as string | undefined) ||
          (user.user_metadata.nickname as string | undefined)
        )) ||
        (user.email ? (user.email as string).split("@")[0] : "Unknown");

    const payload = {
        id: mb.id,
        moodboard_id: mb.id,
        request_id: mb.request_id,
        user_id: user.id,
        authorName,
        title: mb.title || "무드보드",
        image_url: mb.cover_image_url,
        categories: mb.tags ?? [], // feed_posts.categories가 text[]라면 그대로 저장
        likes: 0,
        is_public: true,
    };

    // upsert: moodboard_id 중복이면 덮어씀
    const { data: post, error: perr } = await supabase
        .from("feed_posts")
        .upsert(payload, { onConflict: "moodboard_id" })
        .select("id")
        .single();

    if (perr) {
        console.error("feed_posts 저장 실패:", perr);
        alert("피드 게시에 실패했습니다.");
        return;
    }

    alert("피드에 게시했어요!");
    // 예: 피드 상세 페이지로 이동
    router.push(`/feed`);
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
                            onPostFeed={handlePostFeed}
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
                <MoodboardPreview coverUrl={coverUrl} loading={loadingCover} />
            </div>
        </main>
    );
}

