import React from 'react';
import {
  FolderCard,
  ThumbnailGrid,
  ThumbnailItem,
  FolderInfo,
  FolderName,
  FolderDate
} from './myfolder.styled';
import { useRouter } from 'next/navigation';

interface MyFolderProps {
  id: string;
  name: string;
  date: string;
  thumbnails?: string[]; // 썸네일 이미지 url 최대 6개
}

const MyFolder: React.FC<MyFolderProps> = ({ id, name, date, thumbnails = [] }) => {
  const router = useRouter();
  
  // 6개 미만이면 빈 칸 채우기
  const items = [...thumbnails];
  while (items.length < 6) items.push('');

  const handleClick = () => {
    router.push(`/mypage/folder/${id}`);
  };

  return (
    <FolderCard onClick={handleClick}>
      <ThumbnailGrid>
        {items.map((src, idx) => (
          <ThumbnailItem
            key={idx}
            style={
              src
                ? {
                    backgroundImage: `url(${src})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }
                : {}
            }
          />
        ))}
      </ThumbnailGrid>
      <FolderInfo>
        <FolderName>{name}</FolderName>
        <FolderDate>{date}</FolderDate>
      </FolderInfo>
    </FolderCard>
  );
};

export default MyFolder;
