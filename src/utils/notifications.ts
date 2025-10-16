import { supabase } from '@/utils/supabase';

// 알림 타입 정의
export type NotificationType = 'LIKE' | 'PAYMENT' | 'UPLOAD' | 'DELETE';

export type NotificationTemplateKey = 
  | 'LIKE'
  | 'PAYMENT_COMPLETE'
  | 'PAYMENT_REMINDER'
  | 'PAYMENT_CANCELLED'
  | 'UPLOAD'
  | 'DELETE';

// 알림 생성 파라미터
interface CreateNotificationParams {
  userId: string;
  type: NotificationType;
  templateKey: NotificationTemplateKey;
  templateData: Record<string, string>;
  link?: string;
  relatedFeedId?: string;
  relatedUserId?: string;
  relatedPaymentId?: string;
}

// 알림 생성 함수 (서버사이드에서만 사용)
export async function createNotification(params: CreateNotificationParams) {
  try {
    const { data, error } = await supabase
      .from('notifications')
      .insert({
        user_id: params.userId,
        type: params.type,
        template_key: params.templateKey,
        template_data: params.templateData,
        link: params.link,
        related_feed_id: params.relatedFeedId,
        related_user_id: params.relatedUserId,
        related_payment_id: params.relatedPaymentId,
      })
      .select()
      .single();

    if (error) {
      console.error('알림 생성 실패:', error);
      return { success: false, error };
    }

    console.log('알림 생성 성공:', data);
    return { success: true, data };
  } catch (err) {
    console.error('알림 생성 중 오류:', err);
    return { success: false, error: err };
  }
}

// 좋아요 알림 생성
export async function createLikeNotification(
  feedOwnerId: string,
  likerName: string,
  feedName: string,
  feedId: string,
  likerId: string
) {
  return createNotification({
    userId: feedOwnerId,
    type: 'LIKE',
    templateKey: 'LIKE',
    templateData: {
      userName: likerName,
      feedName: feedName,
    },
    relatedFeedId: feedId,
    relatedUserId: likerId,
  });
}

// 피드 업로드 알림 생성
export async function createUploadNotification(
  userId: string,
  feedName: string,
  feedId: string
) {
  return createNotification({
    userId,
    type: 'UPLOAD',
    templateKey: 'UPLOAD',
    templateData: {
      feedName: feedName,
    },
    relatedFeedId: feedId,
  });
}

// 피드 삭제 알림 생성
export async function createDeleteNotification(
  userId: string,
  feedName: string,
  feedId: string
) {
  return createNotification({
    userId,
    type: 'DELETE',
    templateKey: 'DELETE',
    templateData: {
      feedName: feedName,
    },
    relatedFeedId: feedId,
  });
}

// 결제 완료 알림 생성
export async function createPaymentCompleteNotification(
  userId: string,
  paymentId: string
) {
  return createNotification({
    userId,
    type: 'PAYMENT',
    templateKey: 'PAYMENT_COMPLETE',
    templateData: {},
    link: '/payment/success',
    relatedPaymentId: paymentId,
  });
}

// 결제 취소 알림 생성
export async function createPaymentCancelledNotification(
  userId: string,
  paymentId: string
) {
  return createNotification({
    userId,
    type: 'PAYMENT',
    templateKey: 'PAYMENT_CANCELLED',
    templateData: {},
    relatedPaymentId: paymentId,
  });
}

// 구독 만료 1일 전 알림 생성
export async function createSubscriptionReminderNotification(
  userId: string,
  subscriptionId: string
) {
  return createNotification({
    userId,
    type: 'PAYMENT',
    templateKey: 'PAYMENT_REMINDER',
    templateData: {},
    link: '/mypage/subscription',
    relatedPaymentId: subscriptionId,
  });
}

// 읽지 않은 알림 개수 조회
export async function getUnreadNotificationCount(userId: string): Promise<number> {
  try {
    const { count, error } = await supabase
      .from('notifications')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId)
      .eq('is_read', false);

    if (error) {
      console.error('읽지 않은 알림 수 조회 실패:', error);
      return 0;
    }

    return count || 0;
  } catch (err) {
    console.error('읽지 않은 알림 수 조회 중 오류:', err);
    return 0;
  }
}

// 오래된 알림 정리 (30일 이전 알림 삭제)
export async function cleanupOldNotifications() {
  try {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const { error } = await supabase
      .from('notifications')
      .delete()
      .lt('timestamp', thirtyDaysAgo.toISOString());

    if (error) {
      console.error('오래된 알림 삭제 실패:', error);
      return { success: false, error };
    }

    console.log('오래된 알림 정리 완료');
    return { success: true };
  } catch (err) {
    console.error('오래된 알림 정리 중 오류:', err);
    return { success: false, error: err };
  }
}