// pages/mypage.tsx
'use client';

import SideBar from '@/components/section/mypage/Sidebar';
import Bottom from '@/components/common/bottom/bottom';
import Header from '@/components/common/header/header';
import Moodboard from '@/components/section/mypage/Moodboard';

const mockData = [
  { title: '여행의 추억', date: '2025.05.01', image: '/assets/images/santa.png' },
  { title: '디자인 참고', date: '2025.05.10', image: '/assets/images/moon.png' },
  { title: '감성 모음', date: '2025.05.20', image: '/assets/images/sky.png' },
];

export default function Mypage() {
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
                <h1 style={{ marginBottom: '30px' }}>내 무드보드</h1>
                <div
                    style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(332px, 1fr))',
                    gap: '24px',
                    }}
                >
                    {mockData.map((item, index) => (
                    <Moodboard
                        key={index}
                        title={item.title}
                        date={item.date}
                        image={item.image}
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