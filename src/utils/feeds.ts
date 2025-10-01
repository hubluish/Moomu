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

  return data.flatMap((item) => item.feed_posts).filter(Boolean);
};

// 피드에 '좋아요'를 추가합니다.
export const likeFeed = async (userId: string, postId: string) => {
  const { error: insertError } = await supabase
    .from("liked_feeds")
    .insert({ user_id: userId, post_id: postId });

  if (insertError) throw insertError;

  // const { error: rpcError } = await supabase.rpc("increment_likes", {
  //   post_id_to_update: postId,
  // });

  // if (rpcError) throw rpcError;
};

// 피드 '좋아요'를 취소합니다.
export const unlikeFeed = async (userId: string, postId: string) => {
  const { error: deleteError } = await supabase
    .from("liked_feeds")
    .delete()
    .eq("user_id", userId)
    .eq("post_id", postId);

  if (deleteError) throw deleteError;

  // const { error: rpcError } = await supabase.rpc("decrement_likes", {
  //   post_id_to_update: postId,
  // });

  // if (rpcError) throw rpcError;
};
