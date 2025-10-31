"use client";
import React, { useState, useEffect, ReactNode } from "react";
import { supabase } from "@/utils/supabase";
import Footer from "@/components/common/footer/Footer";
import { getLikedFeeds, unlikeFeed } from "@/utils/feeds";
import Sidebar from "@/components/section/mypage/Sidebar";
import MoodboardModal from "@/app/feed/MoodboardModal";
import Moodboard from "@/components/section/mypage/moodboard/Moodboard";
import Toast from "@/components/common/toast/Toast";
import { MoodboardGridSkeleton } from "@/components/section/mypage/moodboard/MoodboardSkeleton";
import Image from "next/image";

interface FeedPost {
  id: string;
  image_url: string | null;
  categories: string[];
  created_at: string;
  authorName: string;
}

const TrashIcon = () => (
  <Image
    src="/assets/icons/trash.svg"
    alt="휴지통"
    width={25}
    height={25}
    draggable="false"
  />
);

const ErrorIcon = () => (
  <Image
    src="/assets/icons/error-cross.svg"
    alt="실패"
    width={25}
    height={25}
    draggable="false"
  />
);

const FavoritePage = ({}) => {
  const [likedFeeds, setLikedFeeds] = useState<FeedPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [isBoardModalOpen, setBoardModalOpen] = useState(false);
  const [selectedBoardIdForModal, setSelectedBoardIdForModal] = useState<
    string | null
  >(null);

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

  const handleMoodboardClick = (moodboardId: string) => {
    setSelectedBoardIdForModal(moodboardId);
    setBoardModalOpen(true);
  };

  const handleCloseBoardModal = () => {
    setBoardModalOpen(false);
    setSelectedBoardIdForModal(null);
  };

  const handleUnlikeFeed = async (postId: string) => {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) {
        displayToast("로그인이 필요해요.", <ErrorIcon />);
        return;
      }

      await unlikeFeed(session.user.id, postId);
      setLikedFeeds((prev) => prev.filter((feed) => feed.id !== postId));
      displayToast("찜한 피드에서 삭제했어요", <TrashIcon />);
    } catch {
      displayToast("삭제에 실패했어요.", <ErrorIcon />);
    }
  };

  return (
    <div>
      <div style={{ display: "flex", marginTop: "64px", minHeight: "100vh" }}>
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
          <h1 style={{ marginBottom: "30px", userSelect: "none" }}>
            찜한 피드
          </h1>

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
                  <div
                    key={feed.id}
                    onClick={() => handleMoodboardClick(feed.id)}
                    style={{ cursor: "pointer" }}
                  >
                    <Moodboard
                      key={feed.id}
                      id={feed.id}
                      imageUrl={feed.image_url}
                      keywords={(feed.categories || []).slice(0, 4)}
                      date={feed.created_at}
                      type="favorite"
                      authorName={feed.authorName}
                      onAddToFolder={() => {}}
                      onMoveToTrash={() => {}}
                      onRemoveFromFolder={() => {}}
                      onUnlike={() => handleUnlikeFeed(feed.id)}
                      isPublic={true}
                      onTogglePublic={(_moodboardId: string) => {}}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>

        <MoodboardModal
          moodboardId={selectedBoardIdForModal}
          open={isBoardModalOpen}
          onClose={handleCloseBoardModal}
        />

        <Toast
          message={toastInfo.message}
          show={toastInfo.show}
          icon={toastInfo.icon}
        />
      </div>
      <Footer />
    </div>
  );
};

export default FavoritePage;
