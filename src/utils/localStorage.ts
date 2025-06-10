// utils/localStorage.ts

export interface MoodboardData {
  id: string;
  title: string;
  date: string;
  image: string;
  isFavorite: boolean;
  isDeleted: boolean;
  deletedAt?: Date;
  folderId?: string;
}

export interface FolderData {
  id: string;
  name: string;
  createdAt: Date;
  moodboardIds: string[];
}

interface StoredMoodboardData {
  id: string;
  title: string;
  date: string;
  image: string;
  isFavorite: boolean;
  isDeleted: boolean;
  deletedAt?: string;
  folderId?: string;
}

interface StoredFolderData {
  id: string;
  name: string;
  createdAt: string;
  moodboardIds: string[];
}

const MOODBOARDS_KEY = 'moodboards';
const FOLDERS_KEY = 'folders';

export const getMoodboards = (): MoodboardData[] => {
  if (typeof window === 'undefined') return [];
  
  const storedData = localStorage.getItem(MOODBOARDS_KEY);
  if (!storedData) return [];

  try {
    const parsedData = JSON.parse(storedData) as StoredMoodboardData[];
    return parsedData.map(item => ({
      ...item,
      deletedAt: item.deletedAt ? new Date(item.deletedAt) : undefined
    }));
  } catch (error) {
    console.error('Failed to parse moodboards from localStorage:', error);
    return [];
  }
};

export const saveMoodboards = (moodboards: MoodboardData[]) => {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(MOODBOARDS_KEY, JSON.stringify(moodboards));
  } catch (error) {
    console.error('Failed to save moodboards to localStorage:', error);
  }
};

export const updateMoodboard = (updatedMoodboard: MoodboardData) => {
  const moodboards = getMoodboards();
  const updatedMoodboards = moodboards.map(mb => 
    mb.id === updatedMoodboard.id ? updatedMoodboard : mb
  );
  saveMoodboards(updatedMoodboards);
  return updatedMoodboards;
};

export const initializeMoodboards = (initialData: MoodboardData[]) => {
  const storedData = getMoodboards();
  if (storedData.length === 0) {
    saveMoodboards(initialData);
    return initialData;
  }
  return storedData;
};

export const getFolders = (): FolderData[] => {
  if (typeof window === 'undefined') return [];
  
  const storedData = localStorage.getItem(FOLDERS_KEY);
  if (!storedData) return [];

  try {
    const parsedData = JSON.parse(storedData) as StoredFolderData[];
    return parsedData.map(item => ({
      ...item,
      createdAt: new Date(item.createdAt)
    }));
  } catch (error) {
    console.error('Failed to parse folders from localStorage:', error);
    return [];
  }
};

export const saveFolders = (folders: FolderData[]) => {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(FOLDERS_KEY, JSON.stringify(folders));
  } catch (error) {
    console.error('Failed to save folders to localStorage:', error);
  }
};

export const createFolder = (name: string): FolderData => {
  const folders = getFolders();
  const newFolder: FolderData = {
    id: Date.now().toString(),
    name,
    createdAt: new Date(),
    moodboardIds: []
  };
  
  const updatedFolders = [...folders, newFolder];
  saveFolders(updatedFolders);
  return newFolder;
};

export const addMoodboardToFolder = (folderId: string, moodboardId: string) => {
  const folders = getFolders();
  const moodboards = getMoodboards();
  
  const updatedFolders = folders.map(folder => {
    if (folder.id === folderId) {
      return {
        ...folder,
        moodboardIds: [...folder.moodboardIds, moodboardId]
      };
    }
    return folder;
  });
  
  const updatedMoodboards = moodboards.map(moodboard => {
    if (moodboard.id === moodboardId) {
      return {
        ...moodboard,
        folderId
      };
    }
    return moodboard;
  });
  
  saveFolders(updatedFolders);
  saveMoodboards(updatedMoodboards);
  
  return { updatedFolders, updatedMoodboards };
};

export const updateFolder = (folderId: string, newName: string) => {
  const folders = getFolders();
  const updatedFolders = folders.map(folder => 
    folder.id === folderId ? { ...folder, name: newName } : folder
  );
  saveFolders(updatedFolders);
  return updatedFolders;
}; 