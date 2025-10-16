// 실제 프로젝트에서 알림을 생성하는 방법 예시

import { supabase } from '@/utils/supabase';
import { 
  createLikeNotification,
  createUploadNotification,
  createDeleteNotification,
  createPaymentCompleteNotification,
  createPaymentCancelledNotification 
} from '@/utils/notifications';

// 1. 좋아요 기능에서 알림 생성
async function handleLike(feedId: string, likerId: string) {
  try {
    // 피드 정보 조회
    const { data: feed } = await supabase
      .from('feeds') // 실제 테이블 이름으로 변경
      .select('user_id, title, name') // 실제 컬럼 이름으로 변경
      .eq('id', feedId)
      .single();

    // 좋아요를 누른 사용자 정보 조회
    const { data: liker } = await supabase
      .from('profiles')
      .select('name')
      .eq('id', likerId)
      .single();

    if (feed && liker && feed.user_id !== likerId) {
      // 자신의 피드에 좋아요를 누른 경우가 아닐 때만 알림 생성
      await createLikeNotification(
        feed.user_id,
        liker.name,
        feed.title || feed.name, // 피드 이름
        feedId,
        likerId
      );
    }
  } catch (error) {
    console.error('좋아요 알림 생성 실패:', error);
  }
}

// 2. 피드 업로드 시 알림 생성
async function handleFeedUpload(userId: string, feedId: string, feedName: string) {
  try {
    await createUploadNotification(userId, feedName, feedId);
  } catch (error) {
    console.error('업로드 알림 생성 실패:', error);
  }
}

// 3. 피드 삭제 시 알림 생성
async function handleFeedDelete(userId: string, feedId: string, feedName: string) {
  try {
    await createDeleteNotification(userId, feedName, feedId);
  } catch (error) {
    console.error('삭제 알림 생성 실패:', error);
  }
}

// 4. 결제 완료 시 알림 생성 (Webhook에서 호출)
async function handlePaymentSuccess(userId: string, paymentId: string) {
  try {
    await createPaymentCompleteNotification(userId, paymentId);
  } catch (error) {
    console.error('결제 완료 알림 생성 실패:', error);
  }
}

// 5. 결제 취소 시 알림 생성
async function handlePaymentCancel(userId: string, paymentId: string) {
  try {
    await createPaymentCancelledNotification(userId, paymentId);
  } catch (error) {
    console.error('결제 취소 알림 생성 실패:', error);
  }
}

// 사용 예시 export
export {
  handleLike,
  handleFeedUpload,
  handleFeedDelete,
  handlePaymentSuccess,
  handlePaymentCancel,
};