import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/utils/supabase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'PATCH') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // 사용자 인증 확인
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ error: 'Authorization header required' });
    }

    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);

    if (authError || !user) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    const { notificationIds } = req.body;

    if (!notificationIds || !Array.isArray(notificationIds)) {
      return res.status(400).json({ error: 'notificationIds array is required' });
    }

    // 알림 읽음 처리
    const { error } = await supabase
      .from('notifications')
      .update({ is_read: true })
      .in('id', notificationIds)
      .eq('user_id', user.id); // 보안: 자신의 알림만 업데이트 가능

    if (error) {
      console.error('알림 읽음 처리 실패:', error);
      return res.status(500).json({ error: 'Failed to mark notifications as read' });
    }

    return res.status(200).json({
      success: true,
      message: 'Notifications marked as read',
    });
  } catch (err) {
    console.error('알림 읽음 처리 API 오류:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}