import React from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import styles from "./article/ArticleDetail.module.css";

export default function PrivacyPolicy() {
  const router = useRouter();

  const privacyContent = `
    <h2>개인정보처리방침</h2>
    <p><strong>시행일자: 2024년 10월 16일</strong></p>
    
    <h3>1. 개인정보의 처리목적</h3>
    <p>Moomu('회사'라 함)는 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며, 이용 목적이 변경되는 경우에는 개인정보보호법 제18조에 따라 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.</p>
    
    <ul>
      <li>서비스 제공 및 계약 이행</li>
      <li>회원 가입 및 관리</li>
      <li>무드보드 생성 및 피드 서비스 제공</li>
      <li>고객 상담 및 불만 처리</li>
      <li>서비스 개선 및 신규 서비스 개발</li>
    </ul>

    <h3>2. 개인정보의 처리 및 보유기간</h3>
    <p>회사는 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터 개인정보를 수집 시에 동의 받은 개인정보 보유·이용기간 내에서 개인정보를 처리·보유합니다.</p>
    
    <ul>
      <li><strong>회원 정보:</strong> 회원 탈퇴 시까지 (단, 관계 법령에 따라 보존이 필요한 경우 해당 기간까지)</li>
      <li><strong>서비스 이용 기록:</strong> 3년</li>
      <li><strong>결제 정보:</strong> 5년 (전자상거래법)</li>
      <li><strong>쿠키 정보:</strong> 1년</li>
    </ul>

    <h3>3. 처리하는 개인정보의 항목</h3>
    <p>회사는 다음의 개인정보 항목을 처리하고 있습니다.</p>
    
    <h4>필수항목</h4>
    <ul>
      <li>이름, 이메일 주소</li>
      <li>서비스 이용 기록, 접속 로그, 쿠키, 접속 IP 정보</li>
    </ul>
    
    <h4>선택항목</h4>
    <ul>
      <li>프로필 사진</li>
      <li>생년월일</li>
      <li>관심사 정보</li>
    </ul>

    <h3>4. 개인정보의 제3자 제공</h3>
    <p>회사는 정보주체의 동의, 법률의 특별한 규정 등 개인정보보호법 제17조 및 제18조에 해당하는 경우에만 개인정보를 제3자에게 제공합니다.</p>
    
    <p>현재 회사는 개인정보를 제3자에게 제공하고 있지 않습니다.</p>

    <h3>5. 개인정보처리의 위탁</h3>
    <p>회사는 원활한 개인정보 업무처리를 위하여 다음과 같이 개인정보 처리업무를 위탁하고 있습니다.</p>
    
    <ul>
      <li><strong>서버 호스팅:</strong> Vercel, Supabase</li>
      <li><strong>결제 서비스:</strong> 토스페이먼츠</li>
      <li><strong>이메일 발송:</strong> [이메일 서비스 제공업체]</li>
    </ul>

    <h3>6. 정보주체의 권리·의무 및 행사방법</h3>
    <p>정보주체는 회사에 대해 언제든지 다음 각 호의 개인정보 보호 관련 권리를 행사할 수 있습니다.</p>
    
    <ul>
      <li>개인정보 처리현황 통지 요구</li>
      <li>개인정보 열람 요구</li>
      <li>개인정보 정정·삭제 요구</li>
      <li>개인정보 처리정지 요구</li>
    </ul>
    
    <p>권리 행사는 개인정보보호법 시행령 제41조제1항에 따라 서면, 전자우편, 모사전송(FAX) 등을 통하여 하실 수 있으며 회사는 이에 대해 지체없이 조치하겠습니다.</p>

    <h3>7. 개인정보의 파기</h3>
    <p>회사는 개인정보 보유기간의 경과, 처리목적 달성 등 개인정보가 불필요하게 되었을 때에는 지체없이 해당 개인정보를 파기합니다.</p>
    
    <h4>파기절차</h4>
    <p>이용자가 입력한 정보는 목적 달성 후 별도의 DB에 옮겨져 내부 방침 및 기타 관련 법령에 따라 일정기간 저장된 후 혹은 즉시 파기됩니다.</p>
    
    <h4>파기방법</h4>
    <ul>
      <li>전자적 파일: 기록을 재생할 수 없도록 로우레벨포맷 등의 방법을 이용하여 삭제</li>
      <li>종이 문서: 분쇄기로 분쇄하거나 소각하여 파기</li>
    </ul>

    <h3>8. 개인정보 보호책임자</h3>
    <p>회사는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 정보주체의 불만처리 및 피해구제 등을 위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다.</p>
    
    <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
      <p><strong>개인정보 보호책임자</strong></p>
      <p>성명: [담당자명]</p>
      <p>직책: [직책]</p>
      <p>연락처: contact@moomu.co.kr</p>
    </div>
    
    <p>정보주체는 회사의 서비스를 이용하시면서 발생한 모든 개인정보 보호 관련 문의, 불만처리, 피해구제 등에 관한 사항을 개인정보 보호책임자에게 문의하실 수 있습니다.</p>

    <h3>9. 개인정보의 안전성 확보조치</h3>
    <p>회사는 개인정보보호법 제29조에 따라 다음과 같이 안전성 확보에 필요한 기술적/관리적 및 물리적 조치를 하고 있습니다.</p>
    
    <ul>
      <li>개인정보 취급 직원의 최소화 및 교육</li>
      <li>개인정보에 대한 접근 제한</li>
      <li>개인정보를 안전하게 저장·전송할 수 있는 암호화 기법 사용</li>
      <li>해킹 등에 대비한 기술적 대책</li>
      <li>개인정보처리시스템 등의 접근권한 관리</li>
    </ul>

    <h3>10. 쿠키의 설치·운영 및 거부</h3>
    <p>회사는 이용자에게 개별적인 맞춤서비스를 제공하기 위해 이용정보를 저장하고 수시로 불러오는 '쿠키(cookie)'를 사용합니다.</p>
    
    <p>쿠키는 웹사이트를 운영하는데 이용되는 서버(http)가 이용자의 컴퓨터 브라우저에게 보내는 소량의 정보이며 이용자들의 PC 컴퓨터내의 하드디스크에 저장되기도 합니다.</p>

    <h3>11. 개인정보처리방침의 변경</h3>
    <p>이 개인정보처리방침은 2024년 10월 16일부터 적용됩니다.</p>
    
    <p>이전의 개인정보처리방침은 아래에서 확인하실 수 있습니다.</p>
    
    <p>개인정보처리방침이 변경되는 경우 회사는 변경사항을 게시하며, 변경된 개인정보처리방침은 게시한 날로부터 7일 후부터 효력을 발생합니다. 다만, 수집하는 개인정보의 항목, 이용목적의 변경 등과 같이 이용자 권리의 중대한 변경이 발생할 때에는 최소 30일 전에 게시하고 별도의 수단을 통하여 알려드리겠습니다.</p>
  `;

  return (
    <div className={styles.container}>
      {/* 대표 이미지 */}
      <div className={styles.imageWrap}>
        <Image
          src="/assets/images/privacy-policy-banner.svg"
          alt="개인정보처리방침"
          width={1200}
          height={400}
          className={styles.mainImage}
        />
        <div className={styles.imageOverlay} />
        <Image
          width={24}
          height={24}
          src="/assets/icons/left.svg"
          alt="이전"
          className={styles.backIcon}
          onClick={() => router.back()}
        />
      </div>

      {/* 제목/카테고리/날짜 */}
      <div className={styles.titleSection}>
        <div className={styles.titleInner}>
          <div className={styles.titleRow}>
            <div className={styles.titleText}>개인정보처리방침</div>
            <div className={styles.dateText}>2024.10.16</div>
          </div>
          <div className={styles.categoryBox}>
            <span className={styles.categoryText}>법적 고지</span>
          </div>
        </div>
      </div>

      {/* 본문 */}
      <div className={styles.contentSection}>
        <div
          className={styles.contentHtml}
          dangerouslySetInnerHTML={{ __html: privacyContent }}
        />
      </div>

      {/* 목록으로 버튼 */}
      <div className={styles.backSection}>
        <button className={styles.backBtn} onClick={() => router.back()}>
          이전으로
        </button>
      </div>
    </div>
  );
}