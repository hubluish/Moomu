'use client';

import "../../../styles/variable.css"
import SideBar from '@/components/section/mypage/Sidebar';
import Bottom from '@/components/common/bottom/bottom';
import Header from '@/components/common/header/header';
import Moodboard from '@/components/section/mypage/Moodboard';
import { useState, useEffect } from 'react';
import { MoodboardData, initializeMoodboards, updateMoodboard, getMoodboards } from '@/utils/localStorage';

const mockData: MoodboardData[] = [
  { id: '1', title: '여행의 추억', date: '2025.05.01', image: '/assets/images/santa.png', isFavorite: false, isDeleted: false },
  { id: '2', title: '디자인 참고', date: '2025.05.10', image: '/assets/images/moon.png', isFavorite: false, isDeleted: false },
  { id: '3', title: '감성 모음1', date: '2025.05.20', image: '/assets/images/sky.png', isFavorite: false, isDeleted: false },
  { id: '4', title: '감성 모음2', date: '2025.05.20', image: '/assets/images/sky.png', isFavorite: false, isDeleted: false },
  { id: '5', title: '감성 모음3', date: '2025.05.20', image: '/assets/images/sky.png', isFavorite: false, isDeleted: false },
  { id: '6', title: '감성 모음4', date: '2025.05.20', image: '/assets/images/sky.png', isFavorite: false, isDeleted: false },
  { id: '7', title: '감성 모음5', date: '2025.05.20', image: '/assets/images/sky.png', isFavorite: false, isDeleted: false },
  { id: '8', title: '여름 휴가', date: '2025.06.01', image: '/assets/images/santa.png', isFavorite: false, isDeleted: false },
  { id: '9', title: '겨울 추억', date: '2025.06.05', image: '/assets/images/moon.png', isFavorite: false, isDeleted: false },
  { id: '10', title: '가을 감성', date: '2025.06.10', image: '/assets/images/sky.png', isFavorite: false, isDeleted: false },
  { id: '11', title: '봄의 시작', date: '2025.06.15', image: '/assets/images/santa.png', isFavorite: false, isDeleted: false },
  { id: '12', title: '일상의 기록', date: '2025.06.20', image: '/assets/images/moon.png', isFavorite: false, isDeleted: false },
];

export default function Mypage_Moodboard() {
  const [moodboards, setMoodboards] = useState<MoodboardData[]>([]);

  useEffect(() => {
    // 로컬 스토리지가 비어있을 때만 mockData로 초기화
    const storedMoodboards = getMoodboards();
    if (storedMoodboards.length === 0) {
      const initializedMoodboards = initializeMoodboards(mockData);
      setMoodboards(initializedMoodboards);
    } else {
      setMoodboards(storedMoodboards);
    }
  }, []);

  const handleMoodboardUpdate = (updatedMoodboard: MoodboardData) => {
    const updatedMoodboards = updateMoodboard(updatedMoodboard);
    setMoodboards(updatedMoodboards);
  };

  // 삭제되지 않은 무드보드만 표시
  const activeMoodboards = moodboards.filter(mb => !mb.isDeleted);

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
          <div style={{ marginBottom: '30px', fontSize: 'var(--font-title1)', fontWeight: 'bold' }}>내 무드보드</div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(332px, 1fr))',
              gap: '45px 38px',
            }}
          >
            {activeMoodboards.map((item) => (
              <Moodboard
                key={item.id}
                id={item.id}
                title={item.title}
                date={item.date}
                image={item.image}
                isFavorite={item.isFavorite}
                onUpdate={handleMoodboardUpdate}
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