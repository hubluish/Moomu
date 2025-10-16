import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/utils/supabase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
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

    // 읽지 않은 알림 개수 조회
    const { count, error } = await supabase
      .from('notifications')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id)
      .eq('is_read', false);

    if (error) {
      console.error('읽지 않은 알림 수 조회 실패:', error);
      return res.status(500).json({ error: 'Failed to fetch unread count' });
    }

    return res.status(200).json({
      success: true,
      count: count || 0,
    });
  } catch (err) {
    console.error('읽지 않은 알림 수 조회 API 오류:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}