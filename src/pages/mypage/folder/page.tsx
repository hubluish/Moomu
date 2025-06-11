'use client';

import SideBar from '@/components/section/mypage/Sidebar';
import Bottom from '@/components/common/bottom/bottom';
import Header from '@/components/common/header/header';
import MyFolder from '@/components/section/mypage/MyFolder';
import { useEffect, useState } from 'react';
import { getFolders, getMoodboards, FolderData, MoodboardData } from '@/utils/localStorage';

export default function Mypage_Folder() {
  const [folders, setFolders] = useState<FolderData[]>([]);
  const [moodboards, setMoodboards] = useState<MoodboardData[]>([]);

  const fetchData = () => {
    setFolders(getFolders());
    setMoodboards(getMoodboards());
  };

  useEffect(() => {
    fetchData(); // Initial data fetch

    window.addEventListener('localStorageChange', fetchData);

    return () => {
      window.removeEventListener('localStorageChange', fetchData);
    };
  }, []);

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
          <div style={{ marginBottom: '30px', fontSize: 'var(--font-title1)', fontWeight: 'bold' }}>내 폴더</div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(332px, 1fr))',
              gap: '32px',
            }}
          >
            {folders.map(folder => {
              // 폴더에 속한 무드보드 6개까지 썸네일 추출
              const thumbnails = folder.moodboardIds
                .map(id => moodboards.find(mb => mb.id === id && !mb.isDeleted)?.image)
                .filter(Boolean)
                .slice(0, 6) as string[];
              // 폴더 생성일(혹은 업데이트일) 포맷
              const date = folder.createdAt instanceof Date
                ? folder.createdAt.toISOString().slice(0, 10).replace(/-/g, '. ')
                : (folder.createdAt as string)?.slice(0, 10).replace(/-/g, '. ');

              return (
                <MyFolder
                  key={folder.id}
                  id={folder.id}
                  name={folder.name}
                  date={date}
                  thumbnails={thumbnails}
                />
              );
            })}
          </div>
        </main>
      </div>

      {/* 하단 바 */}
      <Bottom />
    </div>
  );
} 