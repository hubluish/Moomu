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

const dispatchLocalStorageChange = () => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('localStorageChange'));
  }
};

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
    dispatchLocalStorageChange();
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
    dispatchLocalStorageChange();
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

export const addMoodboardToFolder = (newFolderId: string, moodboardId: string) => {
  const folders = getFolders();
  const moodboards = getMoodboards();

  let oldFolderId: string | undefined;

  // Find the moodboard and its current folderId
  const moodboardToMove = moodboards.find(mb => mb.id === moodboardId);
  if (moodboardToMove) {
    oldFolderId = moodboardToMove.folderId;
  }

  const updatedFolders = folders.map(folder => {
    // Remove from old folder if applicable and not moving to the same folder
    if (oldFolderId && folder.id === oldFolderId && oldFolderId !== newFolderId) {
      return {
        ...folder,
        moodboardIds: folder.moodboardIds.filter(id => id !== moodboardId)
      };
    }
    // Add to new folder
    if (folder.id === newFolderId) {
      // Ensure no duplicates when adding to new folder
      if (!folder.moodboardIds.includes(moodboardId)) {
        return {
          ...folder,
          moodboardIds: [...folder.moodboardIds, moodboardId]
        };
      }
    }
    return folder;
  });

  const updatedMoodboards = moodboards.map(moodboard => {
    if (moodboard.id === moodboardId) {
      return {
        ...moodboard,
        folderId: newFolderId
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

export const removeMoodboardFromFolder = (folderId: string, moodboardId: string) => {
  const folders = getFolders();
  const updatedFolders = folders.map(folder => {
    if (folder.id === folderId) {
      return {
        ...folder,
        moodboardIds: folder.moodboardIds.filter(id => id !== moodboardId)
      };
    }
    return folder;
  });
  saveFolders(updatedFolders);

  // Optionally, if the moodboard is not in any other folder, you might want to set its folderId to undefined
  const moodboards = getMoodboards();
  const updatedMoodboards = moodboards.map(moodboard => {
    if (moodboard.id === moodboardId && moodboard.folderId === folderId) {
      return { ...moodboard, folderId: undefined };
    }
    return moodboard;
  });
  saveMoodboards(updatedMoodboards);

  return updatedMoodboards;
};

export const removeMoodboardIdFromAllFolders = (moodboardId: string) => {
  const folders = getFolders();
  const updatedFolders = folders.map(folder => ({
    ...folder,
    moodboardIds: folder.moodboardIds.filter(id => id !== moodboardId)
  }));
  saveFolders(updatedFolders);
  return updatedFolders;
}; 