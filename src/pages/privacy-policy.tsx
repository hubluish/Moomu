import React from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import styles from "./article/ArticleDetail.module.css";

export default function PrivacyPolicy() {
  const router = useRouter();

  const privacyContent = `
    <h2>개인정보처리방침</h2>
    
    <p>Moomu('Moomu' 이하 '회사')는 정보주체의 자유와 권리 보호를 위해 ｢개인정보 보호법｣ 및 관계 법령이 정한 바를 준수하여, 적법하게 개인정보를 처리하고 안전하게 관리하고 있습니다. 이에 ｢개인정보 보호법｣ 제30조 에 따라 정보주체에게 개인정보의 처리와 보호에 관한 절차 및 기준을 안내하고, 이와 관련한 고충을 신속하고 원활하게 처리할 수 있도록 하기 위하여 다음과 같이 개인정보 처리방침을 수립·공개합니다.</p>

    <h3>□ 개인정보의 처리목적, 처리 항목, 보유 및 이용 기간</h3>
    <p>Moomu는 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 외의 용도로는 이용되지 않으며, 이용 목적이 변경되는 경우에는 ｢개인정보 보호법｣ 제18조에 따라 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.</p>
    
    <h4>회원 가입 및 관리</h4>
    <p>회원 가입 의사 확인, 회원제 서비스 제공에 따른 본인 식별·인증, 회원자격 유지·관리, 서비스 부정이용 방지, 각종 고지·통지, 고충처리 목적으로 개인 정보를 처리합니다.</p>
    
    <h4>재화 또는 서비스 제공</h4>
    <p>물품배송, 서비스 제공, 계약서·청구서 발송, 콘텐츠 제공, 맞춤형 추천서비스 제공, 본인인증, 연령인증, 요금결제·정산의 목적으로 개인정보를 처리합니다.</p>
    
    <h4>서비스 개발</h4>
    <p>기존 서비스와 별개의 신규 서비스 개발 목적으로 개인정보를 처리합니다.</p>

    <h3>□ 처리하는 개인정보 항목 및 수집 근거</h3>
    <p>Moomu는 서비스 제공 및 법적 의무 이행을 위해 다음과 같은 개인정보 항목을 수집 및 이용합니다.</p>
    
    <table style="width: 100%; border-collapse: collapse; border: 1px solid #ddd; margin: 20px 0;">
      <thead>
        <tr style="background-color: #f8f9fa;">
          <th style="border: 1px solid #ddd; padding: 12px; text-align: left;">처리 목적</th>
          <th style="border: 1px solid #ddd; padding: 12px; text-align: left;">수집·이용 항목</th>
          <th style="border: 1px solid #ddd; padding: 12px; text-align: left;">법적 근거 (개인정보 보호법 제15조 제1항)</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="border: 1px solid #ddd; padding: 12px;">회원 가입 및 관리</td>
          <td style="border: 1px solid #ddd; padding: 12px;">ID, 비밀번호, 성명, 연락처(이메일, 휴대폰 번호 등), 생년월일, 서비스 이용기록</td>
          <td style="border: 1px solid #ddd; padding: 12px;">제1호(동의) 또는 제4호(계약의 이행)</td>
        </tr>
        <tr style="background-color: #f8f9fa;">
          <td style="border: 1px solid #ddd; padding: 12px;">재화 또는 서비스 제공</td>
          <td style="border: 1px solid #ddd; padding: 12px;">이름, 주소, 연락처(전화번호, 휴대폰 번호), 결제 정보(신용카드 정보, 계좌 정보 등), 서비스 이용 기록</td>
          <td style="border: 1px solid #ddd; padding: 12px;">제1호(동의) 및 제4호(계약의 이행), 제5호(법적 의무 준수)</td>
        </tr>
        <tr>
          <td style="border: 1px solid #ddd; padding: 12px;">서비스 개발</td>
          <td style="border: 1px solid #ddd; padding: 12px;">서비스 이용기록, 접속 로그, 쿠키, IP 주소</td>
          <td style="border: 1px solid #ddd; padding: 12px;">제1호(동의) 또는 제4호(계약의 이행)</td>
        </tr>
      </tbody>
    </table>
    
    <p>* <strong>정보주체의 동의 없이 처리하는 개인정보 항목:</strong> Moomu는 ｢개인정보 보호법｣ 제15조제1항제4호('계약 체결·이행')에 따라, 회원 서비스 운영에 필수적인 최소한의 개인정보인 ID를 정보주체의 동의 없이 처리하고 있습니다. (비밀번호는 안전한 서비스 이용을 위해 필수적으로 수집되나, 이는 회원 가입 시 동의에 기반하여 암호화하여 관리됩니다.)</p>

    <h3>□ 개인정보의 처리 및 보유 기간</h3>
    <p>① Moomu는 법령에 따른 개인정보 보유·이용 기간 또는 정보주체로부터 개인정보를 수집 시에 동의받은 개인정보 보유·이용 기간 내에서 개인정보를 처리·보유합니다.</p>
    <p>② 각각의 개인정보 처리 및 보유 기간은 다음과 같습니다.</p>
    
    <h4>홈페이지 회원 가입 및 관리 : 회원 탈퇴 시 까지</h4>
    <p>다만, 다음의 사유에 해당하는 경우에는 해당 사유 종료 시까지</p>
    <ul>
      <li>관계 법령 위반에 따른 수사·조사 등이 진행 중인 경우에는 해당 수사·조사 종료 시까지</li>
      <li>홈페이지 이용에 따른 채권·채무관계 잔존 시에는 해당 채권·채무관계 정산 시까지</li>
    </ul>
    
    <h4>재화 또는 서비스 제공 : 재화·서비스 공급완료 및 요금결제·정산 완료시까지</h4>
    <p>다만, 다음의 사유에 해당하는 경우에는 해당 기간 종료 시까지</p>
    <ul>
      <li>계약 또는 청약철회 등에 관한 기록: 5년 (｢전자상거래 등에서의 소비자보호에 관한 법률 시행령｣ 제6조제1항제2호)</li>
      <li>대금결제 및 재화 등의 공급에 관한 기록: 5년 (｢전자상거래 등에서의 소비자보호에 관한 법률 시행령｣ 제6조제1항제3호)</li>
    </ul>

    <h3>□ 개인정보의 파기 절차 및 방법</h3>
    <p>① Moomu는 개인정보 보유기간의 경과, 처리목적 달성 등 개인정보가 불필요하게 되었을 때에는 지체없이 해당 개인정보를 파기합니다.</p>
    <p>② 정보주체로부터 동의받은 개인정보 보유기간이 경과하거나 처리목적이 달성되었음에도 불구하고 다른 법령에 따라 개인정보를 계속 보존하여야 하는 경우에는, 해당 개인정보를 별도의 데이터베이스(DB)로 옮기거나 보관장소를 달리하여 보존합니다.</p>
    <p>③ 개인정보 파기의 절차 및 방법은 다음과 같습니다.</p>
    
    <h4>파기절차</h4>
    <p>Moomu은(는) 파기 사유가 발생한 개인정보를 선정하고, Moomu의 개인정보 보호 책임자의 승인을 받아 개인정보를 파기합니다.</p>
    
    <h4>파기방법</h4>
    <p>Moomu은(는) 전자적 파일 형태로 기록·저장된 개인정보는 기록을 재생할 수 없도록 파기하며, 종이 문서에 기록·저장된 개인정보는 분쇄기로 분쇄하거나 소각하여 파기합니다.</p>

    <h3>□ 개인정보의 안전성 확보조치</h3>
    <p>Moomu은(는) 개인정보의 안전성 확보를 위해 다음과 같은 조치를 취하고 있습니다.</p>
    
    <ul>
      <li><strong>관리적 조치</strong> : 내부 관리계획 수립·시행, 정기적 직원 교육, 전담조직 운영</li>
      <li><strong>기술적 조치</strong> : 개인정보처리시스템에 대한 등의 접근 권한의 관리, 접근통제시스템 설치 및 기타 관련 보호 조치, 인터넷망 차단 조치, 개인정보의 암호화, 접속기록의 보관 및 점검, 보안프로그램 설치 및 갱신, 개인정보처리시스템의 취약점 점검 및 보완</li>
    </ul>

    <h3>□ 정보주체와 법정대리인의 권리·의무 및 행사방법</h3>
    <p>① 정보주체는 Moomu에 대해 언제든지 개인정보 열람·전송·정정·삭제·처리정지 및 동의 철회 등 을 요구(이하 "권리 행사"라 함)할 수 있습니다.</p>
    <p>② 권리 행사는 Moomu에 대해 ｢개인정보 보호법 시행령｣ 제41조제1항에 따라 서면, 전화, 전자 우편, 팩스(FAX), 인터넷 등을 통하여 하실 수 있으며, Moomu은(는) 이에 대해 지체없이 조치 하겠습니다.</p>
    <p>정보주체는 언제든지 홈페이지 '내정보 > 회원정보'에서 개인정보를 직접 조회·수정·삭제·처리정지·동의 철회하거나 '문의하기'를 통해 열람을 요청할 수 있습니다.</p>
    <p>③ 권리 행사는 정보주체의 법정대리인이나 위임을 받은 자 등 대리인을 통하여 하실 수도 있습니다. 이 경우 "개인 정보 처리 방법에 관한 고시" [별지 11] 서식에 따른 위임장을 제출하셔야 합니다.</p>
    <p>④ 정보주체가 개인정보 열람 및 처리 정지를 요구할 권리는 ｢개인정보 보호법｣ 제35조제4항 및 제37조제2항에 의하여 제한될 수 있습니다.</p>
    <p>⑤ 다른 법령에서 그 개인정보가 수집 대상으로 명시되어 있는 경우에는 해당 개인정보의 삭제를 요구할 수 없습니다.</p>
    <p>⑥ Moomu은(는) 권리 행사를 한 자가 본인이거나 정당한 대리인인지를 확인합니다.</p>
    <p>⑦ 정보주체는 권리 행사를 아래의 부서에 할 수 있습니다. Moomu은(는) 정보주체로부터 권리 행사를 청구받은 날로부터 10일(전송요구의 경우 지체 없이) 이내 회신하겠습니다.</p>

    <h3>□ 개인정보 처리방침의 변경</h3>
    <p>① 이 개인정보 처리방침은 <strong>2025. 8. 12.</strong>부터 적용됩니다.</p>
    <p>② 개인정보 처리방침이 변경되는 경우, 시행하기 최소 7일 전에 홈페이지 공지사항(또는 개별공지)을 통하여 공지하며, 정보주체에게 불리하게 변경되는 경우에는 최소 30일 전에 개별적으로 전자우편, 문자메시지 등 가능한 방법으로 알림으로써 정보주체의 권리를 보호합니다.</p>
    <p>③ (신규 추가) Moomu는 개인정보 처리방침을 변경할 경우, 변경 사항을 정보주체가 명확하게 인지할 수 있도록 개별 알림을 통해 반드시 통지할 것입니다.</p>
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
            <div className={styles.dateText}>2025.08.12</div>
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