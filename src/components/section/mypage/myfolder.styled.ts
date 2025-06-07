import styled from 'styled-components';

export const FolderCard = styled.div`
  width: 332px;
  height: 226px;
  border-radius: 10px;
  background: #fff;
  box-shadow: 0 2px 8px 0 rgba(0,0,0,0.08);
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

export const ThumbnailGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
  width: 100%;
  height: 181px;
  background: #e5e5e5;
  gap: 2px;
`;

export const ThumbnailItem = styled.div`
  background: #dedede;
  width: 100%;
  height: 100%;
`;

export const FolderInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  padding: 0 16px;
  background: #fff;
`;

export const FolderName = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: #222;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const FolderDate = styled.div`
  font-size: 14px;
  color: #888;
`;
