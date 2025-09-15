import { supabase } from "@/utils/supabase";

/**
 * 무드보드를 휴지통으로 보냅니다 (soft delete).
 * @param moodboardId 휴지통으로 보낼 무드보드의 ID
 */
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

/**
 * 무드보드를 데이터베이스에서 영구적으로 삭제합니다.
 * @param moodboardId 삭제할 무드보드의 ID
 */
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

/**
 * 휴지통의 무드보드를 복구합니다.
 * @param moodboardId 복구할 무드보드의 ID
 */
export const restoreMoodboard = async (moodboardId: string) => {
  const { error } = await supabase
    .from("moodboard")
    .update({ deleted_at: null }) // deleted_at 값을 null로 변경
    .eq("id", moodboardId);

  if (error) {
    console.error("Error restoring moodboard:", error);
    throw error;
  }
};
