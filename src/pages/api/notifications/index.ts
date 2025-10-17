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

    // 알림 조회
    const { data: notifications, error } = await supabase
      .from('notifications')
      .select('*')
      .eq('user_id', user.id)
      .order('timestamp', { ascending: false })
      .limit(20);

    if (error) {
      console.error('알림 조회 실패:', error);
      return res.status(500).json({ error: 'Failed to fetch notifications' });
    }

    return res.status(200).json({
      success: true,
      data: notifications,
    });
  } catch (err) {
    console.error('알림 API 오류:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}