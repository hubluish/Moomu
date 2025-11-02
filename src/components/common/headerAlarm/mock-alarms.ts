import { AlarmData } from './AlarmModal';

export const mockAlarms: AlarmData[] = [
  {
    id: '1',
    type: 'LIKE',
    messageTemplate: '알림 기능은 아직 준비 단계입니다!',
    timestamp: Date.now(),
    isRead: false,
  },
];