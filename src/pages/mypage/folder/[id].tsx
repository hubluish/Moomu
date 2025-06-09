'use client';

import "../../../styles/variable.css"
import SideBar from '@/components/section/mypage/Sidebar';
import Bottom from '@/components/common/bottom/bottom';
import Header from '@/components/common/header/header';
import Moodboard from '@/components/section/mypage/Moodboard';
import { useState, useEffect } from 'react';
import { MoodboardData, getMoodboards, updateMoodboard, getFolders } from '@/utils/localStorage';
import { useRouter } from 'next/router';

export default function FolderDetail() {
  const [moodboards, setMoodboards] = useState<MoodboardData[]>([]);
  const [folderName, setFolderName] = useState('');
  const router = useRouter();
  const { id: folderId } = router.query;

  useEffect(() => {
    if (!folderId || typeof folderId !== 'string') return;
    
    const storedMoodboards = getMoodboards();
    const folders = getFolders();
    const currentFolder = folders.find(folder => folder.id === folderId);
    
    if (currentFolder) {
      setFolderName(currentFolder.name);
      // 해당 폴더에 속한 무드보드만 필터링
      const folderMoodboards = storedMoodboards.filter(mb => mb.folderId === folderId);
      setMoodboards(folderMoodboards);
    }
  }, [folderId]);

  const handleMoodboardUpdate = (updatedMoodboard: MoodboardData) => {
    const updatedMoodboards = updateMoodboard(updatedMoodboard);
    setMoodboards(updatedMoodboards.filter(mb => mb.folderId === folderId));
  };

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
          <div style={{ marginBottom: '30px', fontSize: 'var(--font-title1)', fontWeight: 'bold' }}>
            {folderName}
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(332px, 1fr))',
              gap: '45px 38px',
            }}
          >
            {moodboards.map((item) => (
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