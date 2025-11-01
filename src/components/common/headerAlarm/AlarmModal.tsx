"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import './AlarmModal.css';

// Alarm 데이터 타입 정의
export interface AlarmData {
  id: string; // 알림 고유 ID
  type: 'LIKE' | 'PAYMENT' | 'UPLOAD' | 'DELETE'; // 알림 유형
  messageTemplate: string; // 템플릿 문자열 (예: "${userName}님이 내 피드 "${feedName}"에 좋아요를 눌렀어요 !")
  templateData?: Record<string, string>; // 템플릿에 들어갈 동적 데이터
  message?: string; // 처리된 최종 메시지 (템플릿이 처리된 후)
  timestamp: number; // 알림 발생 시점 (Epoch time)
  isRead: boolean; // 읽음 상태 (true: 이미 읽음, false: 안 읽음)
  link?: string; // 결제 알림 클릭 시 이동할 URL (선택적)
}

// AlarmModal.tsx 컴포넌트 Props 정의
interface AlarmModalProps {
  onClose: () => void; // 모달 닫기 핸들러
  alarms: AlarmData[]; // 알림 데이터 목록
}

const AlarmModal: React.FC<AlarmModalProps> = ({ onClose, alarms }) => {
  const [processedAlarms, setProcessedAlarms] = useState<AlarmData[]>([]);

  // 템플릿 문자열을 처리하는 함수
  const processMessageTemplate = (alarm: AlarmData): string => {
    if (alarm.message) {
      // 이미 처리된 메시지가 있으면 그대로 사용
      return alarm.message;
    }
    
    let processedMessage = alarm.messageTemplate;
    
    if (alarm.templateData) {
      // 템플릿 데이터로 문자열 치환
      Object.entries(alarm.templateData).forEach(([key, value]) => {
        const regex = new RegExp(`\\$\\{${key}\\}`, 'g');
        processedMessage = processedMessage.replace(regex, value);
      });
    }
    
    return processedMessage;
  };

  // 시간 포맷 함수
  const formatTimeAgo = (timestamp: number): string => {
    const now = Date.now();
    const diff = now - timestamp;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);

    if (hours < 24) {
      return `${hours}시간 전`;
    } else {
      return `${days}일 전`;
    }
  };

  // 최근 7일 이내 알림 필터링
  const filterRecentAlarms = (alarms: AlarmData[]): AlarmData[] => {
    const sevenDaysAgo = Date.now() - (7 * 24 * 60 * 60 * 1000);
    return alarms.filter(alarm => alarm.timestamp >= sevenDaysAgo);
  };

  // 알림 타입별 아이콘 반환
  const getAlarmIcon = (type: AlarmData['type']) => {
    switch (type) {
      case 'LIKE':
        return (
          <Image 
            src="/assets/icons/alarmModal/like.svg" 
            alt="좋아요" 
            width={54}
            height={54}
            className="alarm-modal__icon alarm-modal__icon--like" 
          />
        );
      case 'PAYMENT':
        return (
          <Image 
            src="/assets/icons/alarmModal/payment.svg" 
            alt="결제" 
            width={54}
            height={54}
            className="alarm-modal__icon alarm-modal__icon--payment" 
          />
        );
      case 'UPLOAD':
        return (
          <Image 
            src="/assets/icons/alarmModal/upload.svg" 
            alt="업로드" 
            width={54}
            height={54}
            className="alarm-modal__icon alarm-modal__icon--upload" 
          />
        );
      case 'DELETE':
        return (
          <Image 
            src="/assets/icons/alarmModal/delete.svg" 
            alt="삭제" 
            width={54}
            height={54}
            className="alarm-modal__icon alarm-modal__icon--delete" 
          />
        );
      default:
        return null;
    }
  };

  // 알림 클릭 핸들러
  const handleAlarmClick = (alarm: AlarmData) => {
    if (alarm.type === 'PAYMENT' && alarm.link) {
      window.location.href = alarm.link;
    }
  };

  // 모달 외부 클릭 핸들러
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // ESC 키 핸들러
  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscKey);
    // 모달이 열릴 때 모든 알림을 읽음 처리
    const filteredAlarms = filterRecentAlarms(alarms);
    const readAlarms = filteredAlarms.map(alarm => ({ ...alarm, isRead: true }));
    setProcessedAlarms(readAlarms);

    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [alarms, onClose]);

 

  

  return (
    <div className="alarm-modal__overlay" onClick={handleOverlayClick}>
      <div className="alarm-modal">
        <div className="alarm-modal__header">
            알림 
        </div>
        
        <div className="alarm-modal__content">
          {processedAlarms.length === 0 ? (
            <div className="alarm-modal__empty">
              <p>최근 7일간 알림이 없습니다.</p>
            </div>
          ) : (
            <div className="alarm-modal__list">
              <div className="alarm_frame">
              {processedAlarms.map((alarm) => (
                <div
                  key={alarm.id}
                  className={`alarm-modal__item ${
                    !alarm.isRead ? 'alarm-modal__item--unread' : ''
                  } ${
                    alarm.type === 'PAYMENT' ? 'alarm-modal__item--clickable' : ''
                  }`}
                  onClick={() => handleAlarmClick(alarm)}
                >
                  
                  <div className="alarm-modal__item-icon">
                    {getAlarmIcon(alarm.type)}
                  </div>
                  <div className="alarm-modal__item-content">
                    <p className="alarm-modal__item-message">{processMessageTemplate(alarm)}</p>
                    <span className="alarm-modal__item-time">
                      {formatTimeAgo(alarm.timestamp)}
                    </span>
                  </div>
                  </div>
              ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AlarmModal;