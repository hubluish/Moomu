import { supabase } from "@/utils/supabase";

// 무드보드를 휴지통으로 보냄 (soft delete).
export const moveMoodboardToTrash = async (moodboardId: string) => {
  const { error: updateError } = await supabase
    .from("moodboard")
    .update({ deleted_at: new Date().toISOString() })
    .eq("id", moodboardId);

  if (updateError) {
    console.error("Error moving moodboard to trash:", updateError);
    throw updateError;
  }

  const { error: deleteError } = await supabase
    .from("feed_posts")
    .delete()
    .eq("moodboard_id", moodboardId);

  if (deleteError) {
    console.warn(
      "Could not delete from feed_posts (might be ok):",
      deleteError.message
    );
  }
};

// 휴지통의 무드보드를 복구 (deleted_at을 null로 설정)
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

// 무드보드를 데이터베이스에서 영구적으로 삭제
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

// 무드보드의 공개 상태를 토글 (true <-> false).
export const toggleMoodboardPublicStatus = async (
  moodboard: {
    id: string;
    owner_id: string;
    request_id: string;
    title?: string;
    cover_image_url?: string | null;
    tags?: string[];
  },
  authorName: string,
  isCurrentlyPublic: boolean
) => {
  if (isCurrentlyPublic) {
    // 현재 공개 상태 -> 비공개로 (DELETE)
    const { error: deleteError } = await supabase
      .from("feed_posts")
      .delete()
      .eq("moodboard_id", moodboard.id);

    if (deleteError) {
      console.error("Error unpublishing from feed:", deleteError);
      throw deleteError;
    }
  } else {
    // 현재 비공개 상태 -> 공개로 (INSERT)
    const { error: insertError } = await supabase.from("feed_posts").insert({
      moodboard_id: moodboard.id,
      user_id: moodboard.owner_id,
      request_id: moodboard.request_id,
      title: moodboard.title || "New Moodboard",
      image_url: moodboard.cover_image_url,
      categories: moodboard.tags,
      is_public: true,
      authorName: authorName,
      likes: [],
    });

    if (insertError) {
      console.error("Error publishing to feed:", insertError);
      throw insertError;
    }
  }

  const { error: updateError } = await supabase
    .from("moodboard")
    .update({ is_public: !isCurrentlyPublic }) // 👈 현재 상태의 반대로 업데이트
    .eq("id", moodboard.id);

  if (updateError) {
    console.error("Error updating moodboard public status:", updateError);
    throw updateError;
  }

  return !isCurrentlyPublic;
};
