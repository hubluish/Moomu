import { supabase } from "@/utils/supabase";

// 무드보드를 휴지통으로 보냅니다 (soft delete).
export const moveMoodboardToTrash = async (moodboardId: string) => {
  const { error } = await supabase
    .from("moodboard")
    .update({ deleted_at: new Date().toISOString() }) // 현재 시간을 기록
    .eq("id", moodboardId);

  if (error) {
    console.error("Error moving moodboard to trash:", error);
    throw error;
  }
};

// 휴지통의 무드보드를 복구합니다. (deleted_at을 null로 설정)
export const restoreMoodboard = async (moodboardId: string) => {
  const { error } = await supabase
    .from("moodboard")
    .update({ deleted_at: null })
    .eq("id", moodboardId);

  if (error) {
    console.error("Error restoring moodboard:", error);
    throw error;
  }
};

// 무드보드를 데이터베이스에서 영구적으로 삭제합니다.
export const permanentDeleteMoodboard = async (moodboardId: string) => {
  const { error } = await supabase
    .from("moodboard")
    .delete()
    .eq("id", moodboardId);

  if (error) {
    console.error("Error permanent deleting moodboard:", error);
    throw error;
  }
};

// 무드보드의 공개 상태를 토글합니다 (true <-> false).
export const toggleMoodboardPublicStatus = async (moodboardId: string) => {
  const { data: currentData, error: selectError } = await supabase
    .from("moodboard")
    .select("is_public")
    .eq("id", moodboardId)
    .single();

  if (selectError) {
    console.error("Error fetching current public status:", selectError);
    throw selectError;
  }

  const newStatus = !currentData.is_public;
  const { error: updateError } = await supabase
    .from("moodboard")
    .update({ is_public: newStatus })
    .eq("id", moodboardId);

  if (updateError) {
    console.error("Error toggling public status:", updateError);
    throw updateError;
  }

  return newStatus;
};
