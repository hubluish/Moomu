import { supabase } from "@/utils/supabase";

// 특정 사용자가 '찜'한 모든 피드 목록을 가져옵니다.
export const getLikedFeeds = async (userId: string) => {
  const { data, error } = await supabase
    .from("liked_feeds")
    .select("feed_posts(*)")
    .eq("user_id", userId);

  if (error) throw error;

  if (!data) {
    return [];
  }

  return data.map((item) => item.feed_posts).filter(Boolean);
};

// 특정 사용자가 '찜'한 피드를 취소합니다.
export const unlikeFeed = async (userId: string, postId: string) => {
  const { error } = await supabase
    .from("liked_feeds")
    .delete()
    .eq("user_id", userId)
    .eq("post_id", postId);

  if (error) {
    console.error("Error unliking feed:", error);
    throw error;
  }
};
