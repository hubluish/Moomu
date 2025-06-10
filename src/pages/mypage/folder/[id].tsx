'use client';

import "../../../styles/variable.css"
import SideBar from '@/components/section/mypage/Sidebar';
import Bottom from '@/components/common/bottom/bottom';
import Header from '@/components/common/header/header';
import Moodboard from '@/components/section/mypage/Moodboard';
import { useState, useEffect } from 'react';
import { MoodboardData, getMoodboards, updateMoodboard, getFolders, updateFolder } from '@/utils/localStorage';
import { useRouter } from 'next/router';
import { FiEdit2 } from 'react-icons/fi';

export default function FolderDetail() {
  const [moodboards, setMoodboards] = useState<MoodboardData[]>([]);
  const [folderName, setFolderName] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState('');
  const router = useRouter();
  const { id: folderId } = router.query;

  useEffect(() => {
    if (!folderId || typeof folderId !== 'string') return;
    
    const storedMoodboards = getMoodboards();
    const folders = getFolders();
    const currentFolder = folders.find(folder => folder.id === folderId);
    
    if (currentFolder) {
      setFolderName(currentFolder.name);
      setEditedName(currentFolder.name);
      const folderMoodboards = storedMoodboards.filter(mb => mb.folderId === folderId);
      setMoodboards(folderMoodboards);
    }
  }, [folderId]);

  const handleMoodboardUpdate = (updatedMoodboard: MoodboardData) => {
    const updatedMoodboards = updateMoodboard(updatedMoodboard);
    setMoodboards(updatedMoodboards.filter(mb => mb.folderId === folderId));
  };

  const handleNameEdit = () => {
    setIsEditing(true);
  };

  const handleNameSave = () => {
    if (folderId && typeof folderId === 'string') {
      updateFolder(folderId, editedName);
      setFolderName(editedName);
      setIsEditing(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleNameSave();
    }
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
          <div style={{ marginBottom: '30px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            {isEditing ? (
              <input
                type="text"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
                onBlur={handleNameSave}
                onKeyPress={handleKeyPress}
                style={{
                  fontSize: 'var(--font-title1)',
                  fontWeight: 'bold',
                  border: '1px solid #ddd',
                  padding: '5px 10px',
                  borderRadius: '4px',
                  width: '300px'
                }}
                autoFocus
              />
            ) : (
              <>
                <div style={{ fontSize: 'var(--font-title1)', fontWeight: 'bold' }}>
                  {folderName}
                </div>
                <button
                  onClick={handleNameEdit}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '5px',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  <FiEdit2 size={20} />
                </button>
              </>
            )}
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