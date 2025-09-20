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

  if (error) throw error;
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
    .select("moodboard(*)")
    .eq("folder_id", folderId)
    .is("moodboard.deleted_at", null);

  if (error) throw error;

  if (!data) {
    return [];
  }

  return data.flatMap((item) => item.moodboard).filter(Boolean);
};

// 특정 폴더에서 특정 무드보드와의 연결을 제거합니다.
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

// 무드보드를 한 폴더에서 다른 폴더로 이동합니다.
export const moveMoodboardToAnotherFolder = async (
  moodboardId: string,
  currentFolderId: string,
  newFolderId: string
) => {
  const { error } = await supabase
    .from("moodboard_folders")
    .update({ folder_id: newFolderId })
    .eq("moodboard_id", moodboardId)
    .eq("folder_id", currentFolderId);

  if (error) throw error;
};

// 폴더 이름을 변경합니다.
export const renameFolder = async (folderId: string, newName: string) => {
  const { error } = await supabase
    .from("folders")
    .update({ name: newName })
    .eq("id", folderId);
  if (error) throw error;
};

// 폴더를 삭제합니다.
export const deleteFolder = async (folderId: string) => {
  const { error } = await supabase.from("folders").delete().eq("id", folderId);
  if (error) throw error;
};
