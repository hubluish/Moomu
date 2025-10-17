-- 알림 테이블 생성
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('LIKE', 'PAYMENT', 'UPLOAD', 'DELETE')),
  template_key TEXT NOT NULL,
  template_data JSONB DEFAULT '{}',
  timestamp TIMESTAMPTZ DEFAULT NOW(),
  is_read BOOLEAN DEFAULT FALSE,
  link TEXT,
  
  -- 관련 엔티티 ID들 (optional, 나중에 상세 정보 조회용)
  related_feed_id UUID,
  related_user_id UUID, -- 좋아요를 누른 사용자 등
  related_payment_id UUID,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 인덱스 생성
CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_notifications_timestamp ON notifications(timestamp DESC);
CREATE INDEX idx_notifications_is_read ON notifications(user_id, is_read);
CREATE INDEX idx_notifications_type ON notifications(type);

-- RLS (Row Level Security) 정책
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- 사용자는 자신의 알림만 볼 수 있음
CREATE POLICY "Users can view own notifications" 
  ON notifications FOR SELECT 
  USING (auth.uid() = user_id);

-- 사용자는 자신의 알림만 업데이트할 수 있음 (읽음 처리)
CREATE POLICY "Users can update own notifications" 
  ON notifications FOR UPDATE 
  USING (auth.uid() = user_id);

-- 시스템/백엔드만 알림을 생성할 수 있음 (일반 사용자는 직접 생성 불가)
-- 이 정책은 서비스 역할로 알림을 생성할 때 사용

-- 업데이트 시간 자동 갱신 함수
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 트리거 생성
CREATE TRIGGER update_notifications_updated_at 
  BEFORE UPDATE ON notifications 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();