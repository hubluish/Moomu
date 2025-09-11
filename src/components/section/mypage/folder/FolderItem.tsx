import React from "react";
import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";

const FolderWrapper = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  text-decoration: none;
  color: inherit;
`;

const FolderIconWrapper = styled.div`
  width: 180px;
  height: 180px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border: 1px solid rgba(136, 101, 243, 0.5);
  border-radius: 16px;
`;

const FolderName = styled.span`
  font-weight: bold;
`;

type FolderItemProps = {
  id: string;
  name: string;
};

const FolderItem = ({ id, name }: FolderItemProps) => {
  return (
    <FolderWrapper href={`/mypage/folder/${id}`}>
      <FolderIconWrapper>
        <Image
          src="/assets/icons/fill-folder.svg"
          alt="폴더"
          width={120}
          height={120}
        />
      </FolderIconWrapper>
      <FolderName>{name}</FolderName>
    </FolderWrapper>
  );
};

export default FolderItem;
