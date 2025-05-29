'use client';

import SideBar from '@/components/section/mypage/Sidebar';
import Bottom from '@/components/common/bottom/bottom';
import Moodboard from '@/components/section/mypage/Moodboard';

export default function Home() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
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
          <Moodboard />
        </main>
        
      </div>

      {/* 하단 바 */}
      <Bottom />
    </div>
  );
}