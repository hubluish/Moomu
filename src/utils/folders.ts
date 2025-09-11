import { supabase } from "@/utils/supabase";

// 현재 유저의 모든 폴더 가져오기
export const getAllFolders = async () => {
  const { data, error } = await supabase.from("folders").select("*");
  if (error) throw error;
  return data;
};

// 새 폴더 만들기
export const createFolder = async (userId: string, folderName: string) => {
  const { data, error } = await supabase
    .from("folders")
    .insert({ user_id: userId, name: folderName })
    .select()
    .single();
  if (error) throw error;
  return data;
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
