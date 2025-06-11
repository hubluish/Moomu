'use client';

import "../../../styles/variable.css"
import SideBar from '@/components/section/mypage/Sidebar';
import Bottom from '@/components/common/bottom/bottom';
import Header from '@/components/common/header/header';
import Moodboard from '@/components/section/mypage/Moodboard';
import { useState, useEffect, useMemo } from 'react';
import { MoodboardData, getMoodboards, updateMoodboard, saveMoodboards, removeMoodboardIdFromAllFolders } from '@/utils/localStorage';

export default function Mypage_Trash() {
  const [moodboards, setMoodboards] = useState<MoodboardData[]>([]);

  useEffect(() => {
    const storedMoodboards = getMoodboards();
    setMoodboards(storedMoodboards);
  }, []);

  const handleMoodboardUpdate = (updatedMoodboard: MoodboardData) => {
    const updatedMoodboards = updateMoodboard(updatedMoodboard);
    setMoodboards(updatedMoodboards);
  };

  const handlePermanentDelete = (moodboardId: string) => {
    // Remove from all folders first
    removeMoodboardIdFromAllFolders(moodboardId);
    // Then remove from moodboards array
    const updatedMoodboards = moodboards.filter(mb => mb.id !== moodboardId);
    saveMoodboards(updatedMoodboards);
    setMoodboards(updatedMoodboards);
  };

  // 삭제된 무드보드만 표시
  const deletedMoodboards = moodboards.filter(mb => mb.isDeleted);

  // 30일이 지난 무드보드 자동 삭제
  const thirtyDaysAgo = useMemo(() => {
    const date = new Date();
    date.setDate(date.getDate() - 30);
    return date;
  }, []);

  useEffect(() => {
    const permanentDelete = () => {
      const updatedMoodboards = moodboards.filter(
        mb => !mb.isDeleted || (mb.deletedAt && mb.deletedAt > thirtyDaysAgo)
      );
      if (updatedMoodboards.length !== moodboards.length) {
        saveMoodboards(updatedMoodboards);
        setMoodboards(updatedMoodboards);
      }
    };

    permanentDelete();
  }, [moodboards, thirtyDaysAgo]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <div style={{ zIndex: 30 }}>
        <Header />
      </div>
      
      {/* 본문 영역 */}
      <div style={{ display: 'flex', flex: 1 }}>
        {/* 좌측 사이드바 */}
        <div
          style={{
            width: '230px',
            borderRight: '1px solid #eee',
            backgroundColor: '#fefeff',
          }}
        >
          <SideBar />
        </div>

        {/* 메인 콘텐츠 */}
        <main style={{ flex: 1, padding: '50px 70px' }}>
          <div style={{ marginBottom: '30px', fontSize: 'var(--font-title1)', fontWeight: 'bold' }}>휴지통</div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(332px, 1fr))',
              gap: '45px 38px',
            }}
          >
            {deletedMoodboards.map((item) => (
              <Moodboard
                key={item.id}
                id={item.id}
                title={item.title}
                date={item.date}
                image={item.image}
                onUpdate={handleMoodboardUpdate}
                onPermanentDelete={handlePermanentDelete}
                isTrash={true}
              />
            ))}
          </div>
        </main>
      </div>

      {/* 하단 바 */}
      <Bottom />
    </div>
  );
} 