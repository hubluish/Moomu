import React from 'react';
import Header from '@/components/common/header/header';
import BackButton from '../../components/section/result/BackButton';
import ActionButtons from '@/components/section/result/ActionButtons';
import ShareButton from '@/components/section/result/ShareButtons';
import { useRouter } from "next/router";

import MoodboardPreview from '@/components/section/result/MoodboardPreview';
import styles from './save.module.css';

export default function SavePage() {

    const router = useRouter();

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
                    <ActionButtons
                        onSaveImage={() => { alert('이미지 저장 기능은 곧 제공될 예정입니다.'); }}
                        onPostFeed={() => { alert('피드 게시 기능은 곧 제공될 예정입니다.'); }}
                        onShare={() => { alert('공유 기능은 곧 제공될 예정입니다.'); }}
                    />
                </div>
                <MoodboardPreview />
            </div>
        </main>
    );
}

