"use client";
import React, { useState, useEffect, ReactNode } from "react";
import { supabase } from "@/utils/supabase";
import { getLikedFeeds, unlikeFeed } from "@/utils/feeds";
import Sidebar from "@/components/section/mypage/Sidebar";
import Moodboard from "@/components/section/mypage/moodboard/Moodboard";
import Toast from "@/components/common/toast/Toast";
import { MoodboardGridSkeleton } from "@/components/section/mypage/moodboard/MoodboardSkeleton";
import Image from "next/image";

interface FeedPost {
  id: string;
  cover_image_url: string | null;
  categories: string[];
  created_at: string;
}

const TrashIcon = () => (
  <Image src="/assets/icons/trash.svg" alt="휴지통" width={25} height={25} />
);

const ErrorIcon = () => (
  <Image
    src="/assets/icons/error-cross.svg"
    alt="실패"
    width={25}
    height={25}
  />
);

const FavoritePage = ({}) => {
  const [likedFeeds, setLikedFeeds] = useState<FeedPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [toastInfo, setToastInfo] = useState<{
    message: string;
    show: boolean;
    icon?: ReactNode;
  }>({
    message: "",
    show: false,
    icon: undefined,
  });

  const displayToast = (message: string, icon?: ReactNode) => {
    setToastInfo({ message, show: true, icon });

    setTimeout(() => {
      setToastInfo((prev) => ({ ...prev, show: false }));
    }, 3000);
  };

  useEffect(() => {
    const fetchLikedFeeds = async () => {
      setIsLoading(true);
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        if (session) {
          const feedData = await getLikedFeeds(session.user.id);
          setLikedFeeds(feedData);
        }
      } catch (error) {
        console.error("찜한 피드 로딩 실패:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchLikedFeeds();
  }, []);

  const handleUnlikeFeed = async (postId: string) => {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) {
        displayToast("로그인이 필요합니다.", <ErrorIcon />);
        return;
      }

      await unlikeFeed(session.user.id, postId);
      setLikedFeeds((prev) => prev.filter((feed) => feed.id !== postId));
      displayToast("찜한 피드에서 삭제했어요", <TrashIcon />);
    } catch {
      displayToast("삭제에 실패했습니다.", <ErrorIcon />);
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar />
      <main
        style={{
          flex: 1,
          padding: "50px 70px",
          display: "flex",
          flexDirection: "column",
          overflowY: "auto",
        }}
      >
        <h1 style={{ marginBottom: "30px" }}>찜한 피드</h1>

        <div style={{ flex: 1, display: "grid" }}>
          {isLoading ? (
            <MoodboardGridSkeleton count={6} />
          ) : likedFeeds.length === 0 ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: "100%",
                color: "#888",
              }}
            >
              <p>찜한 피드가 없습니다.</p>
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(332px, 1fr))",
                gap: "45px 28px",
              }}
            >
              {likedFeeds.map((feed) => (
                <Moodboard
                  key={feed.id}
                  id={feed.id}
                  imageUrl={feed.cover_image_url}
                  keywords={(feed.categories || []).slice(0, 4)}
                  date={feed.created_at}
                  type="favorite"
                  authorName="작성자"
                  onAddToFolder={() => {}}
                  onMoveToTrash={() => {}}
                  onRemoveFromFolder={() => {}}
                  onUnlike={() => handleUnlikeFeed(feed.id)}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      <Toast
        message={toastInfo.message}
        show={toastInfo.show}
        icon={toastInfo.icon}
      />
    </div>
  );
};

export default FavoritePage;
