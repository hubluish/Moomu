import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/utils/supabase';
import { AlarmData } from '@/components/common/headerAlarm/AlarmModal';

// 알림 템플릿 정의
const ALARM_TEMPLATES = {
  LIKE: "${userName}님이 내 피드 \"${feedName}\"에 좋아요를 눌렀어요 !",
  PAYMENT_COMPLETE: "Plus 구독 상품 결제가 완료되었어요.",
  PAYMENT_REMINDER: "Plus 구독 상품 정기 결제가 하루 남았어요.",
  PAYMENT_CANCELLED: "Plus 구독 상품 결제가 취소되었어요 🥲",
  UPLOAD: "내 피드 \"${feedName}\"이 업로드 되었어요",
  DELETE: "내 피드 \"${feedName}\"을 삭제했어요",
} as const;

// 백엔드에서 받아올 raw 알림 데이터 형태
interface RawAlarmData {
  id: string;
  type: AlarmData['type'];
  template_key: keyof typeof ALARM_TEMPLATES;
  template_data: Record<string, string>;
  timestamp: string;
  is_read: boolean;
  link?: string;
  user_id: string;
}

export const useAlarms = (userId?: string) => {
  const [alarms, setAlarms] = useState<AlarmData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Raw 데이터를 AlarmData로 변환하는 함수
  const transformRawAlarm = (rawAlarm: RawAlarmData): AlarmData => {
    const messageTemplate = ALARM_TEMPLATES[rawAlarm.template_key];
    
    return {
      id: rawAlarm.id,
      type: rawAlarm.type,
      messageTemplate,
      templateData: rawAlarm.template_data,
      timestamp: new Date(rawAlarm.timestamp).getTime(),
      isRead: rawAlarm.is_read,
      link: rawAlarm.link,
    };
  };

  // 알림 데이터 가져오기
  const fetchAlarms = useCallback(async () => {
    if (!userId) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // 개발 환경에서는 바로 목 데이터 사용
      if (process.env.NODE_ENV === 'development') {
        console.log('개발 환경: 목 데이터 사용');
        setAlarms(getMockAlarms());
        setLoading(false);
        return;
      }

      // 사용자 세션에서 토큰 가져오기
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        throw new Error('No session found');
      }

      // API 호출 (인증 토큰 포함)
      const response = await fetch('/api/notifications', {
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`API 호출 실패: ${response.status}`);
      }

      const result = await response.json();
      
      if (result.success && result.data) {
        const transformedAlarms = result.data.map(transformRawAlarm);
        setAlarms(transformedAlarms);
      } else {
        throw new Error('Invalid API response');
      }
    } catch (err) {
      console.error('알림 데이터 가져오기 실패:', err);
      setError('알림을 불러오는 중 오류가 발생했습니다.');
      
      // 에러 발생 시 항상 목 데이터 사용 (개발/운영 관계없이)
      console.log('에러 발생으로 목 데이터 사용');
      setAlarms(getMockAlarms());
    } finally {
      setLoading(false);
    }
  }, [userId]);

  // 임시 개발용 데이터
  const getMockAlarms = (): AlarmData[] => [
    {
      id: '1',
      type: 'LIKE',
      messageTemplate: ALARM_TEMPLATES.LIKE,
      templateData: { userName: '가은', feedName: '여름 바다 무드보드' },
      timestamp: Date.now() - 3600000,
      isRead: false
    },
    {
      id: '2',
      type: 'PAYMENT',
      messageTemplate: ALARM_TEMPLATES.PAYMENT_COMPLETE,
      templateData: {},
      timestamp: Date.now() - 7200000,
      isRead: false,
      link: '/payment/success'
    },
    {
      id: '3',
      type: 'PAYMENT',
      messageTemplate: ALARM_TEMPLATES.PAYMENT_REMINDER,
      templateData: {}, // daysLeft 제거 - 백엔드에서 1일 남았을 때만 알림 생성
      timestamp: Date.now() - 86400000,
      isRead: true
    },
    {
      id: '4',
      type: 'PAYMENT',
      messageTemplate: ALARM_TEMPLATES.PAYMENT_CANCELLED,
      templateData: {},
      timestamp: Date.now() - 172800000,
      isRead: true
    },
    {
      id: '5',
      type: 'UPLOAD',
      messageTemplate: ALARM_TEMPLATES.UPLOAD,
      templateData: { feedName: '무무1' },
      timestamp: Date.now() - 259200000,
      isRead: true
    },
    {
      id: '6',
      type: 'DELETE',
      messageTemplate: ALARM_TEMPLATES.DELETE,
      templateData: { feedName: '무무뭄' },
      timestamp: Date.now() - 345600000,
      isRead: true
    },
    {
      id: '7',
      type: 'LIKE',
      messageTemplate: ALARM_TEMPLATES.LIKE,
      templateData: { userName: '소현', feedName: '가을 감성 컬렉션' },
      timestamp: Date.now() - 432000000,
      isRead: true
    },
    {
      id: '8',
      type: 'LIKE',
      messageTemplate: ALARM_TEMPLATES.LIKE,
      templateData: { userName: '혜윤', feedName: '겨울 원더랜드' },
      timestamp: Date.now() - 518400000,
      isRead: true
    }
  ];

  // 알림 읽음 처리
  const markAsRead = async (alarmIds: string[]) => {
    try {
      // 개발 환경에서는 로컬 상태만 업데이트
      if (process.env.NODE_ENV === 'development') {
        console.log('개발 환경: 로컬 상태만 업데이트');
        setAlarms(prev => 
          prev.map(alarm => 
            alarmIds.includes(alarm.id) 
              ? { ...alarm, isRead: true }
              : alarm
          )
        );
        return;
      }

      // 사용자 세션에서 토큰 가져오기
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        throw new Error('No session found');
      }

      // API 호출
      const response = await fetch('/api/notifications/mark-read', {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ notificationIds: alarmIds }),
      });

      if (!response.ok) {
        throw new Error(`API 호출 실패: ${response.status}`);
      }

      // 로컬 상태 업데이트
      setAlarms(prev => 
        prev.map(alarm => 
          alarmIds.includes(alarm.id) 
            ? { ...alarm, isRead: true }
            : alarm
        )
      );
    } catch (err) {
      console.error('알림 읽음 처리 실패:', err);
      
      // 에러 발생 시에도 로컬 상태는 업데이트 (UX 개선)
      setAlarms(prev => 
        prev.map(alarm => 
          alarmIds.includes(alarm.id) 
            ? { ...alarm, isRead: true }
            : alarm
        )
      );
    }
  };

  useEffect(() => {
    fetchAlarms();
  }, [fetchAlarms]);

  return {
    alarms,
    loading,
    error,
    refetch: fetchAlarms,
    markAsRead
  };
};