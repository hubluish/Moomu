import { supabase } from "@/utils/supabase";

// 현재 유저의 모든 폴더 가져오기
export const getFolders = async (userId: string) => {
  const { data, error } = await supabase
    .from("folders")
    .select("*")
    .eq("user_id", userId);

  if (error) throw error;
  return data;
};

// 새 폴더 만들기
export const createFolder = async (userId: string, folderName: string) => {
  const { error } = await supabase
    .from("folders")
    .insert({ user_id: userId, name: folderName });

  if (error) {
    console.error("Supabase insert error:", error);
    throw error;
  }
};

// 무드보드를 폴더에 추가하기
export const addMoodboardToFolder = async (
  moodboardId: string,
  folderId: string
) => {
  const { error } = await supabase
    .from("moodboard_folders")
    .insert({ moodboard_id: moodboardId, folder_id: folderId });
  if (error) throw error;
};

// ID로 특정 폴더 정보 가져오기
export const getFolderById = async (folderId: string) => {
  const { data, error } = await supabase
    .from("folders")
    .select("name")
    .eq("id", folderId)
    .single();
  if (error) throw error;
  return data;
};

// 특정 폴더에 속한 무드보드 목록 가져오기
export const getMoodboardsByFolder = async (folderId: string) => {
  const { data, error } = await supabase
    .from("moodboard_folders")
    .select("moodboard!inner(*)")
    .eq("folder_id", folderId)
    .is("moodboard.deleted_at", null);

  if (error) {
    console.error("Error fetching moodboards by folder:", error);
    throw error;
  }

  if (!data) {
    return [];
  }

  return data.map((item) => item.moodboard).filter(Boolean);
};

/**
 * 특정 폴더에서 특정 무드보드와의 연결을 제거합니다.
 * @param moodboardId 제거할 무드보드 ID
 * @param folderId 무드보드가 속한 현재 폴더 ID
 */
export const removeMoodboardFromFolder = async (
  moodboardId: string,
  folderId: string
) => {
  const { error } = await supabase
    .from("moodboard_folders")
    .delete()
    .eq("moodboard_id", moodboardId)
    .eq("folder_id", folderId);

  if (error) throw error;
};

/**
 * 무드보드를 한 폴더에서 다른 폴더로 이동합니다.
 * @param moodboardId 이동할 무드보드 ID
 * @param currentFolderId 현재 폴더 ID
 * @param newFolderId 새로 이동할 폴더 ID
 */
export const moveMoodboardToAnotherFolder = async (
  moodboardId: string,
  currentFolderId: string,
  newFolderId: string
) => {
  const { error } = await supabase
    .from("moodboard_folders")
    .update({ folder_id: newFolderId }) // folder_id를 새 ID로 수정
    .eq("moodboard_id", moodboardId)
    .eq("folder_id", currentFolderId); // 현재 폴더에 있는 것을 찾아서

  if (error) {
    console.error("Error moving moodboard:", error);
    throw error;
  }
};
