import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/utils/supabase';
import { createSubscriptionReminderNotification } from '@/utils/notifications';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // API 키 인증 (크론 잡 보안)
    const apiKey = req.headers['x-api-key'];
    if (apiKey !== process.env.CRON_API_KEY) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // 내일 만료되는 구독 찾기
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);

    const dayAfterTomorrow = new Date(tomorrow);
    dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 1);

    // 구독 테이블에서 내일 만료되는 구독들 조회
    // (테이블 구조는 실제 프로젝트에 맞게 수정 필요)
    const { data: expiringSubs, error } = await supabase
      .from('subscriptions') // 구독 테이블 이름
      .select('user_id, id, expires_at')
      .gte('expires_at', tomorrow.toISOString())
      .lt('expires_at', dayAfterTomorrow.toISOString())
      .eq('status', 'active');

    if (error) {
      console.error('만료 예정 구독 조회 실패:', error);
      return res.status(500).json({ error: 'Failed to fetch expiring subscriptions' });
    }

    if (!expiringSubs || expiringSubs.length === 0) {
      return res.status(200).json({
        success: true,
        message: 'No subscriptions expiring tomorrow',
        processed: 0,
      });
    }

    let processedCount = 0;
    const errors: Array<{
      userId: string;
      subscriptionId: string;
      error: unknown;
    }> = [];

    for (const sub of expiringSubs) {
      try {
        // 이미 알림을 보냈는지 체크
        const { data: existingNotification } = await supabase
          .from('notifications')
          .select('id')
          .eq('user_id', sub.user_id)
          .eq('type', 'PAYMENT')
          .eq('template_key', 'PAYMENT_REMINDER')
          .eq('related_payment_id', sub.id)
          .gte('timestamp', tomorrow.toISOString())
          .single();

        if (existingNotification) {
          console.log(`알림 이미 존재: 사용자 ${sub.user_id}, 구독 ${sub.id}`);
          continue;
        }

        // 알림 생성
        const result = await createSubscriptionReminderNotification(
          sub.user_id,
          sub.id
        );

        if (result.success) {
          processedCount++;
          console.log(`알림 생성 성공: 사용자 ${sub.user_id}, 구독 ${sub.id}`);
        } else {
          errors.push({
            userId: sub.user_id,
            subscriptionId: sub.id,
            error: result.error,
          });
        }
      } catch (err) {
        console.error(`구독 ${sub.id} 알림 처리 중 오류:`, err);
        errors.push({
          userId: sub.user_id,
          subscriptionId: sub.id,
          error: err,
        });
      }
    }

    return res.status(200).json({
      success: true,
      message: 'Subscription reminder notifications processed',
      totalSubscriptions: expiringSubs.length,
      processed: processedCount,
      errors: errors.length > 0 ? errors : undefined,
    });
  } catch (err) {
    console.error('구독 만료 알림 크론 잡 오류:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

// 사용 예시:
// Vercel Cron Jobs에서 매일 오전 9시에 실행
// vercel.json에 추가:
/*
{
  "crons": [
    {
      "path": "/api/cron/subscription-reminders",
      "schedule": "0 9 * * *"
    }
  ]
}
*/