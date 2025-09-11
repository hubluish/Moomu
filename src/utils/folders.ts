import { supabase } from "@/utils/supabase";

// 현재 유저의 모든 폴더 가져오기
export const getFolders = async (userId: string) => {
  // 👇 1. userId를 인자로 받도록 수정
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
    .select(
      `
      moodboard_results (
        id,
        created_at,
        thumbnail_url,
        color_keyword,
        font_keyword,
        image_keyword
      )
    `
    )
    .eq("folder_id", folderId);

  if (error) {
    console.error("Error fetching moodboards by folder:", error);
    throw error;
  }

  if (!data) {
    return [];
  }

  return data.map((item) => item.moodboard_results).filter(Boolean);
};
