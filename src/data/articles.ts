import { Article } from "@/types/article"; // Article 타입 경로에 맞게 수정하세요.

export const allArticles: Article[] = [
  {
    id: 1,
    title: "어딘가 친근한 이 앱!",
    slug: "어딘가-친근한-이-앱",
    content: `<div class="markdown-title1">카카오뱅크는</div><div></div><div></div><div></div><div></div><div class="markdown-body1">사용자와의 거리감을 줄이기 위해 ‘친근함’을 적극적으로 시각화한 디자인을 사용합니다.</div><div></div><div>대표적으로 노란색을 메인 컬러로 사용해 시선을 끌고, 둥근 형태의 서체와 일러스트 아이콘을 활용하여 전체적인 분위기를 부드럽게 만듭니다.</div><div></div><div></div><div></div><div></div><div></div><div class="markdown-title2">단순한</div><div></div><div>UI 컴포넌트들은 라운드 처리되고 그림자 효과보다는 단순한 레이어로 정리되어 시각적으로도 부담이 적습니다.</div><div></div><div></div><div></div><div></div><div>이런 스타일은 사용자에게 편안하고 신뢰감 있는 이미지를 전달하는 데 효과적이며, 특히 금융 서비스를 처음 이용하는 MZ세대에게 큰 호응을 얻습니다.</div><div></div><div></div><div></div><div></div><div></div><div class="markdown-title2">무드보드를 제작할 때는 다음과 같은 포인트를 참고하세요:</div><div></div><div>🎨 밝고 경쾌한 노란 계열 배경</div><div></div><div></div><div></div><div>🧸 둥글고 부드러운 느낌의 아이콘과 타이포</div><div></div><div></div><div></div><div>🔄 단순 명료한 카드형 레이아웃</div><div></div><div></div><div></div><div>💬 짧은 문장과 유쾌한 카피</div><div></div><div></div><div></div><div>🪄 불필요한 장식을 최소화한 UI 요소들</div><div></div><div></div><div></div><div></div><div></div><div>사용자 경험을 고려한 설계와 친근한 비주얼은 브랜드 충성도를 높이고자 하는 서비스에 
꼭 필요한 디자인 전략입니다.</div>`,
    category: "UI",
    date: "2025-05-14",
    imageUrl:
      "https://i.pinimg.com/736x/1f/e6/0c/1fe60cecfbcd5bcdad951efa55d94911.jpg",
    description: "캐주얼하지만 체계적인 느낌의 디자인",
    views: 0,
    isRecommended: true,
    keywords: ["밝은", "타이포", "캐주얼", "카드형"],
  },
  {
    id: 2,
    title: "뱅크샐러드",
    slug: "뱅크샐러드",
    content: `<div class="markdown-title1">뱅크샐러드는</div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div class="markdown-title2">데이터를 중심으로 한 서비스임에도 불구하고</div><div></div><div></div><div></div><div></div><div>시각적으로 풍부한 표현을 통해 무거움을 줄입니다.</div><div></div><div></div><div></div><div></div><div>정보를 단순 나열하지 않고, 색상으로 분류하고</div><div></div><div></div><div></div><div></div><div>시각화하여 사용자가 직관적으로 이해할 수 있게 합니다.</div><div></div><div>차트나 그래프는 컬러풀하게 표현되고,</div><div></div><div></div><div></div><div></div><div>카드형 정보 배열은 정보의 흐름을 정돈해 줍니다.</div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div class="markdown-title2">무드보드를 구성할 때 주목해야 할 포인트:</div><div></div><div></div><div></div><div></div><div>📈 정보의 구조를 시각적으로 나누는 컬러 코딩</div><div></div><div></div><div></div><div></div><div>🗂 카드형 인터페이스 구조로 콘텐츠 정렬</div><div></div><div></div><div></div><div></div><div>📊 원형, 막대형 등 다양한 차트 그래픽 예시</div><div></div><div></div><div></div><div></div><div>🎨 메인 컬러 외 보조 컬러까지 조화롭게 설계</div><div></div><div></div><div></div><div></div><div>💡 데이터 기반의 정보도 감성적으로 표현</div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div>복잡한 통계를 다루는 서비스, 건강관리 앱,</div><div>금융 서비스 등에서 유용하며,</div><div></div><div></div><div></div><div></div><div>사용자에게 데이터의 신뢰성과 동시에 접근성을 제공하는 디자인입니다.</div>`,
    category: "UI",
    date: "2025-06-04",
    imageUrl:
      "https://i.pinimg.com/736x/67/bb/12/67bb1206a8eaa4280f8befd7a5189c74.jpg",
    description: "숫자도 아름다울 수 있다!",
    views: 11,
    isRecommended: false,
    keywords: ["컬러풀", "모듈", "차트"],
  },
  {
    id: 3,
    title: "요즘 IT 스타트업은",
    slug: "요즘-IT-스타트업은",
    content: `<div class="markdown-title1">요즘의 IT 스타트업은</div><div></div><div></div><div></div><div></div><div class="markdown-title2">정보를 빠르게 전달하면서도 
사용자 경험을 해치지 않는 UI에 집중합니다.</div><div></div><div></div><div></div><div></div><div>이때 중요한 역할을 하는 것이 바로</div><div></div><div class="markdown-title1">마이크로인터랙션</div><div></div><div>입니다.</div><div></div><div></div><div></div><div></div><div class="markdown-title2">작은 애니메이션 효과 하나로 사용자 행동을 유도하고,</div><div></div><div>클릭이나 스크롤에 따른 자연스러운 반응은 UI에 생명력을 더합니다.</div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div>정보의 계층은 명확하고,</div><div></div><div></div><div></div><div></div><div>한 화면에 들어가는 콘텐츠 양도 적절히 조절되어 있습니다.</div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div class="markdown-title2">무드보드 제작 시 다음 요소를 중점적으로 고려해보세요:</div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div>⚙️ 버튼, 스크롤 등 인터랙션 요소에 애니메이션 적용</div><div></div><div></div><div></div><div></div><div>📊 카드나 대시보드 형태의 정보 정리</div><div></div><div></div><div></div><div></div><div>📱 모바일 최적화를 고려한 반응형 UI</div><div></div><div></div><div></div><div></div><div>🔍 검색 기능과 필터 기능의 직관적 배치</div><div></div><div></div><div></div><div></div><div>🧩 컬러는 중성톤에 포인트 컬러만 최소화 사용</div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div>스타트업의 역동성과 민첩함을 표현하려면 이 같은 인터페이스 전략이 매우 유용합니다.</div>`,
    category: "UI",
    date: "2025-06-03",
    imageUrl:
      "https://i.pinimg.com/736x/35/d1/94/35d1943c629f253ec86b725f85ced83c.jpg",
    description: "마이크로인터랙션으로 완성되는 트렌디함",
    views: 0,
    isRecommended: false,
    keywords: ["카드", "각진", "깔끔한"],
  },
  {
    id: 4,
    title: "잡지 스타일 카드뉴스",
    slug: "잡지-스타일-카드뉴스",
    content: `<div>잡지 스타일의 카드뉴스는 강렬한 비주얼과 간결하면서도 파워풀한 메시지를 시각적으로 강조하는 데 초점이 있습니다.
크고 선명한 인물 이미지, 도시의 구조적 배경, 하이 콘트라스트의 컬러 조합이 시선을 사로잡습니다.</div><div></div><div>텍스트는 사진과 함께 과감하게 배치되며, Bold한 타이포그래피가 중심이 됩니다.
흑백 모노톤 또는 극적인 네온 포인트 컬러를 사용하면 긴장감을 더욱 높일 수 있습니다.</div><div></div><div>무드보드에 담으면 좋은 요소:</div><div></div><div>📷 대비 강한 인물 또는 도시 이미지</div><div></div><div>🔠 굵고 시크한 타이포 (예: Montserrat Bold)</div><div></div><div>📰 좌우 여백 없이 텍스트와 이미지가 겹치는 구성</div><div></div><div>🖤 흑백 톤 중심, 간혹 네온 포인트 삽입</div><div></div><div>🧥 시크하고 모던한 분위기의 패션 이미지 활용</div><div></div><div>브랜드 런칭, 캠페인 메시지, 뷰티/패션 프로모션 등에 적합하며, 메시지의 임팩트를 강조하고자 할 때 활용하기 좋습니다</div>`,
    category: "카드뉴스",
    date: "2025-06-03",
    imageUrl:
      "https://i.pinimg.com/736x/ce/4d/e4/ce4de4f9a066b8913d7236dbbf6f9bc4.jpg",
    description: "대담한 이미지와 타이포 조화",
    views: 1,
    isRecommended: true,
    keywords: ["모노톤", "도시", "강렬한"],
  },
  {
    id: 5,
    title: "정책/공공정보 카드뉴스",
    slug: "정책-공공정보-카드뉴스",
    content: `<div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div>정책이나 공공 정보를 다룰 때는 시각적 효과보다 명확한 정보 전달이 우선입니다.
카드뉴스에서도 구조적 배치와 정돈된 타이포, 아이콘 중심의 안내 구성이 중요합니다.</div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div>색상은 혼란을 피하기 위해 톤온톤 계열의 블루, 그레이 등을 사용하고, 폰트는 정갈하고 깔끔한 고딕체가 주로 쓰입니다.
복잡한 내용을 표, 체크리스트, 아이콘으로 분할해 전달함으로써 사용자의 이해도를 높입니다.</div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div>무드보드 구성 시 추천되는 요소:</div><div></div><div>🧾 체크박스, 리스트 중심의 정보 블록</div><div></div><div>📘 블루 또는 네이비 톤 중심 팔레트</div><div></div><div>🧭 심플 아이콘과 깔끔한 고딕 타이포 조합</div><div></div><div>📊 차트, 도표와 함께 구성된 시각 요약</div><div></div><div>🏛 정부 로고, 인증 마크 등 공식 요소 포함</div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div>공공기관, NGO, 사회적 가치 기반 브랜드에서 효과적인 정보 카드뉴스 구성이 가능하며, 정돈된 시각 전달을 원하는 경우에 적합한 전략입니다.</div>`,
    category: "카드뉴스",
    date: "2025-05-13",
    imageUrl:
      "https://i.pinimg.com/736x/55/47/32/55473264d4137d40d5e399bed094fc97.jpg",
    description: " 정보 전달 중심 레이아웃",
    views: 0,
    isRecommended: false,
    keywords: ["모던", "톤온톤", "도시"],
  },
  {
    id: 6,
    title: "뮤직 콘서트 포스터",
    slug: "뮤직-콘서트-포스터",
    content: `<div>콘서트나 클럽 파티, DJ 공연을 알리는 포스터는 시각적 강도와 사운드에 대한 상상력을 동시에 자극해야 합니다.</div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div>어두운 배경 위에 빛이 부딪히는 듯한 연출, 그리고 입체적인 레이아웃이 분위기를 고조시킵니다.</div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div>글자 크기와 위치, 레이어의 깊이까지 활용해 시선을 끌어야 
하며, 타이포 자체가 디자인이 되는 경우도 많습니다.</div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div>🔥 다크 네이비, 퍼플, 블랙 톤 배경</div><div></div><div>🎤 강한 콘트라스트 조명 효과 (예: 붉은 광선)</div><div></div><div>💿 타이포그래피에 반사 효과나 입체감 부여</div><div></div><div>📣 뮤지션의 실루엣이나 사운드파 시각화</div><div></div><div>🖍 폰트는 날카롭거나 디지털한 스타일 활용</div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div>이 포스터는 야간 이벤트, 일렉트로닉 음악, 언더그라운드 클럽 등에서 필수적이며, 무드보드에는 조명, 움직임, 소리, 그림자를 주제로 이미지와 폰트를 배치하면 좋습니다.</div>`,
    category: "포스터",
    date: "2025-05-06",
    imageUrl:
      "https://i.pinimg.com/736x/0a/6d/0e/0a6d0e2a014cce171e75417b790d8934.jpg",
    description: "조명과 그림자로 조여오는 압도감",
    views: 0,
    isRecommended: false,
    keywords: ["강렬한", "어두운", "조명"],
  },
  {
    id: 7,
    title: "벤토 그리드 (Bento Grid)",
    slug: "깔끔한-디자인",
    content: `<div class="markdown-title1">벤토 그리드(Bento Grid)는!!!</div><div></div><div></div><div></div><div></div>

일본의 정갈한 도시락(벤토)에서 영감을 받은 모듈형 레이아웃 시스템이에요!
단순히 예쁘기만 한 것이 아니라, 정보를 가장 효율적이고 시각적으로 매력 있게 전달하는 최신 UI/UX 트렌드이죠.
<div></div><div></div><div></div>
<div class="markdown-title2">디자인의 원리와 가치는</div>
<div></div><div></div>
<div class="markdown-body1">웹사이트나 앱 화면을 다양한 크기의 사각형 블록으로 나누어 콘텐츠를 배치하는 방식이에요.
마치 퍼즐 조각처럼 각 블록이 하나의 독립된 정보를 담고 있지만, 전체적으로 완벽한 균형을 이루는 것이 특징이죠.</div>
<div></div><div></div>
이 방식은 정보 과부하 시대에 사용자들이 복잡한 내용을 즉각적으로 이해하고, 원하는 기능이나 정보를 직관적으로 찾아낼 수 있도록 도와주는 핵심적인 역할을 수행해요.
<div></div><div></div><div></div>
<div class="markdown-title2">이토록 인기 있는 이유를 분석해볼까요?</div>
<div></div><div></div>
📏 명확한 정보 위계: 블록의 크기로 콘텐츠의 중요도를 결정할 수 있어요.
가장 중요한 메시지는 가장 크게, 부가 정보는 작게 배치하여 사용자의 시선을 자연스럽게 유도하죠.<div></div>

📱 탁월한 반응성: 그리드 기반이기 때문에, 데스크톱, 태블릿, 모바일 등 어떤 기기에서 접속해도 일관된 환경과 아름다운 레이아웃을 유지할 수 있어요.
다양한 디바이스 대응은 현대 디자인에서 필수 요소이죠.<div></div>

🔗 참여도(Engagement) 증가: 각 블록에 사진, 짧은 텍스트, 애니메이션, 클릭 가능한 인터랙션 등을 효과적으로 배치할 수 있어요.
사용자는 긴 페이지 스크롤 대신 흥미로운 블록을 탐색하며 더 높은 참여를 보이게 되죠.<div></div>

✨ 대표 사례: Apple이 신제품 스펙이나 기능을 소개할 때 이 벤토 그리드를 사용하면서 전 세계적으로 트렌드가 폭발했어요.
노션(Notion)이나 프레이머(Framer) 같은 생산성 도구의 UI에서도 벤토 그리드의 모듈화된 특성을 자주 볼 수 있답니다.<div></div>

(이미지 출처 : pinterest)`,
    category: "UI",
    date: "2025-11-01",
    imageUrl:
      "https://i.pinimg.com/1200x/c9/9c/49/c99c49ff2fda20545ab5013beefa82fe.jpg",
    description: "깔끔한 디자인은 이렇게",
    views: 0,
    isRecommended: true,
    keywords: ["깔끔한", "심플한", "그리드"],
  },
  {
    id: 8,
    title: " 글래스모피즘",
    slug: "글래스모피즘",
    content: `<div class="markdown-title1">글래스모피즘은!!!</div><div></div><div></div><div></div><div></div><div>유리처럼 반투명한 UI와 디자인 요소를 사용하는 기법입니다.</div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div class="markdown-title2">배경을</div><div></div><div class="markdown-body1">블러 처리하여 콘텐츠 위의 패널이 마치 유리를 통과한 것처럼 보이게 연출하고,</div><div></div><div>이때 빛과 그림자의 효과가 중요하게 작용합니다.</div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div>정보를 층위감 있게 구성하면서도 세련되고 정적인 이미지를 줄 수 있어 웹 UI, 제품 소개, 카드형 레이아웃 등에서 자주 활용됩니다.</div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div class="markdown-title2">무드보드 제작 시 참고할 내용 :</div><div></div><div>❄️ 투명도 + 블러 효과 조합</div><div></div><div>💡 흰색 또는 밝은 색상 가장자리 테두리 효과</div><div></div><div>📐 라운드 박스, 단순한 아이콘과 조화</div><div></div><div>🧊 차가운 느낌을 주는 컬러 팔레트와 어울림</div><div></div><div>📲 최신 UI/UX 트렌드와 매우 밀접</div><div></div><div></div><div></div><div></div><div></div><div></div><div>모던하고 시크한 브랜드 스타일링 또는 디지털 
인터페이스에서 사용하면 세련미를 강조할 수 있습니다.</div>`,
    category: "용어사전",
    date: "2025-06-07",
    imageUrl:
      "https://i.pinimg.com/736x/4c/50/13/4c50132ebe5b7a2581cc1e55ff7f7025.jpg",
    description: "유리처럼 반투명",
    views: 800,
    isRecommended: false,
    keywords: ["현대적", "차가운", "빛"],
  },
  {
    id: 9,
    title: "뉴모피즘",
    slug: "뉴모피즘",
    content: `<div>뉴모피즘은 배경과 요소가 동일한 톤을 유지하면서도, 오목하게 들어가거나 볼록하게 튀어나온 듯한 느낌을 주는 디자인입니다.</div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div>광원과 그림자를 세심하게 조절해 3D처럼 보이도록 하며, 사용자에게 직관적인 인터페이스를 제공합니다.</div><div></div><div>버튼, 입력창 등 인터랙티브 요소에서 자주 등장하며, 브랜드 이미지에 부드러움과 정갈함을 더할 수 있습니다.</div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div>🟤 배경과 요소가 같은 컬러이되, 깊이감 강조</div><div></div><div>💭 부드러운 그림자와 광원 효과 중심</div><div></div><div>🧼 질감 없는 매끄러운 UI 형태</div><div></div><div>🔲 반응형 카드, 버튼, 토글에 적합</div><div></div><div>🪶 플랫보다 조금 더 고급스럽고 미니멀함 전달</div><div></div><div></div><div></div><div></div><div></div><div></div><div>따뜻하고 부드러운 느낌을 주고 싶을 때, 사용자 인터페이스에 감성을 더하고자 할 때 무드보드에 포함해보세요.</div>`,
    category: "용어사전",
    date: "2025-06-05",
    imageUrl:
      "https://i.pinimg.com/736x/5c/a1/67/5ca167863ce52dd77321f7e6940e610b.jpg",
    description: "오목하게 들어가거나 볼록하게 튀어나온 듯한",
    views: 780,
    isRecommended: false,
    keywords: ["미니멀", "뉴모피즘", "심플한"],
  },
  {
    id: 10,
    title: "모듈형 레이아웃",
    slug: "모듈형-레이아웃",
    content: `<div>모듈형 레이아웃은 콘텐츠를 일정한 블록 단위로 나누어 정렬하는 디자인 방식입니다.</div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div>균형 잡힌 구성과 정보 
정돈에 뛰어나며, 다양한 콘텐츠를 깔끔하게 보여줄 수 있습니다.</div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div>그리드 시스템을 기반으로 하고, 반복적으로 배열되는 정보 구조를 통해 안정감과 전문성을 전달합니다.</div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div>🧱 블록 단위 콘텐츠 카드 구성</div><div></div><div></div><div></div><div></div><div>🔲 정렬된 그리드형 정보 구조</div><div></div><div></div><div></div><div></div><div>🗂 다량의 정보나 이미지 분류에 적합</div><div></div><div></div><div></div><div></div><div>🏙 웹/모바일 레이아웃에서 높은 활용도</div><div></div><div></div><div></div><div></div><div>📐 UI디자인과 콘텐츠 큐레이션형 서비스에 적합</div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div>쇼핑몰, 뉴스, 블로그, 데이터 대시보드 무드보드 구성 시 매우 유용한 개념입니다</div>`,
    category: "용어사전",
    date: "2025-06-03",
    imageUrl:
      "https://i.pinimg.com/736x/00/06/d4/0006d4324701d43678dab6373ab4902d.jpg",
    description: "콘텐츠 나눠 정렬하기",
    views: 750,
    isRecommended: false,
    keywords: ["모던", "정갈한", "모듈형"],
  },
  {
    id: 11,
    title: "폰트가 콘텐츠다 ",
    slug: "폰트가-콘텐츠다",
    content: `<div class="markdown-title1">텍스트가 주인공인 시대</div><div></div><div>요즘은 “글자가 주인공”인 디자인이 많아요.
포스터나 카드뉴스도 이미지보다 타이포로 느낌을 잡는 경우가 대부분이에요.</div><div></div><div>특히 각진 고딕, 픽셀 도트, 손글씨, 찐 굵은 명조체가 많이 쓰여요.</div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div class="markdown-title1">이렇게 구성해보세요!</div><div></div><div>타이포 한 줄을 화면 중앙에 크게!</div><div></div><div>배경은 톤 다운 or 솔리드 컬러로 정리하고</div><div></div><div>폰트가 텍스처처럼 보이게 그레인이나 그림자 처리 추가</div><div></div><div>컬러는 블랙+화이트 / 핑크+블루 같은 극명한 대비로 조합</div><div></div><div></div><div></div><div></div><div></div><div class="markdown-title1">이런 곳에 쓰는 걸 추천해요!</div><div></div><div>공연 포스터, SNS 슬로건 콘텐츠, 브랜드 슬로건 카드뉴스, 굿즈 타이포 레이아웃 등</div>`,
    category: "트렌드",
    date: "2025-06-05",
    imageUrl:
      "https://i.pinimg.com/736x/1c/3a/97/1c3a97365d5ad353e3929f7245d0c0b3.jpg",
    description: "타이포그래피를 아시나요~",
    views: 0,
    isRecommended: false,
    keywords: ["유니크", "시크한", "레트로"],
  },
  {
    id: 12,
    title: "위시코어 모르면 안돼!",
    slug: "위시코어-모르면-안돼",
    content: `<div class="markdown-title1">위시코어가 뭐냐면...</div><div></div><div>말 그대로 '소원을 담은 듯한 감성'이에요.
NCT WISH라는 이름처럼 ‘소망’, ‘순수함’, ‘희망’을 키워드로 가진 브랜딩에서 시작된 느낌인데, 지금은 카드뉴스, 포스터, 심지어 패키지 디자인에서도 엄청 많이 보입니다.</div><div></div><div>하늘, 구름, 반투명 유리 필터처럼 흐릿한 조명, 그리고 파스텔 톤이 이 트렌드의 핵심이에요.
위시(NCT WISH) 데뷔 비주얼에서도 볼 수 있듯이, 퍼지하고 부드러운 감정 표현이 시각적으로 녹아 있어요.</div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div class="markdown-title1">위시코어 디자인을 구성하는 요소들</div><div></div><div>퍼지 필터 (blur 필터를 통해 감정 뭉개기!)</div><div></div><div>컬러는 핑크, 라일락, 민트, 화이트.
아주 연하고 부드럽게 만들어요.</div><div></div><div>조명 효과가 꼭 들어가야 해요. 광원 위치도 신중하게 해주세요.</div><div></div><div>인물의 시선이나 표정이 감정적이면 더 좋아요.</div><div></div><div>텍스트는 손글씨처럼 감성적인 구성으로!
길게 안 써도 괜찮아요.</div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div class="markdown-title1">이런 콘텐츠에 잘 어울려요</div><div></div><div>향수 브랜드, 로맨틱 캠페인, 감정 중심의 소셜 브랜딩, 문화행사 포스터, 일기 형식의 카드뉴스.
특히 ‘이유는 없지만 왠지 끌리는’ 콘텐츠에 최적화되어 있답니다.</div>`,
    category: "트렌드",
    date: "2025-06-09",
    imageUrl:
      "https://i.pinimg.com/736x/fb/33/54/fb33543f7613f108261c999f7d93fa9e.jpg",
    description: "위시 NCT WISH 스타일 분석)",
    views: 1,
    isRecommended: false,
    keywords: ["파스텔", "몽환적", "감성적"],
  },
  {
    id: 13,
    title: "감성적인 UI는 여기!",
    slug: "감성적인-UI는-여기",
    content: `<div class="markdown-title1">에어비앤비는</div><div></div><div class="markdown-title2">사용자 경험을 넘어서 ‘사용자 감정’에 집중하는 UI 디자인을 선보입니다.
사람과 사람의 연결, 공간과 경험을 디자인에 녹여냅니다.</div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div class="markdown-title2">컬러</div><div></div><div></div><div></div><div></div><div>따뜻한 톤 위주로 구성되고, 둥글고 부드러운 구성요소들이 편안함을 줍니다.
홈페이지나 앱 곳곳에 삽입된 실제 사용자 이미지와 리뷰는 감정적 연결을 형성하는 데 핵심적인 역할을 합니다.</div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div class="markdown-title2">무드보드에 넣어야 할 시각적 요소는 다음과 같습니다:</div><div></div><div>🌍 실제 사용자의 얼굴이 담긴 사진 또는 호스트 소개</div><div></div><div>☁️ 둥근 모서리 카드형 구성</div><div></div><div>🌅 자연광을 닮은 따뜻한 필터 처리 이미지</div><div></div><div>✨ 포근한 베이지, 코랄, 파스텔 계열 컬러</div><div></div><div>🧡 정서적 메시지를 담은 카피 문구</div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div>브랜드가 감성을 중심으로 구성되거나, 사람 간의 관계를 강조하는 서비스(숙박, 커뮤니티, 소셜플랫폼 등)에 잘 어울리는 디자인입니다.</div>`,
    category: "UI",
    date: "2025-06-26",
    imageUrl:
      "https://i.pinimg.com/736x/5b/be/a1/5bbea10598326c37e1c31a23ab7bcd7a.jpg",
    description: " 여행과 사람을 연결하는 감성 UI",
    views: 4,
    isRecommended: true,
    keywords: ["카드형", "둥근", "코랄", "파스텔"],
  },
  {
    id: 14,
    title: "에세이처럼 읽히는 카뉴",
    slug: "에세이처럼-읽히는-카뉴",
    content: `<div class="markdown-title1">브런치</div><div></div><div class="markdown-title2">감성의 카드뉴스는 정보 전달보다는 감정 공유에 가까운 콘텐츠를 지향합니다.</div><div></div><div></div><div></div><div></div><div>일기처럼 풀어낸 문장,</div><div></div><div>간결한 구성,</div><div></div><div>부드러운 색감과</div><div></div><div>따뜻한 이미지를 조합해</div><div></div><div></div><div></div><div></div><div>에세이처럼 읽히는 카드 콘텐츠를 만들 수 있죠.</div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div class="markdown-title1">색상, 폰트</div><div></div><div>흰색 배경은 시각적 방해 없이 
콘텐츠에 몰입할 수 있도록 돕고,</div><div></div><div></div><div></div><div></div><div>세리프 계열의 부드러운 폰트는 문장의 감성을 배가시켜 줍니다.</div><div></div><div></div><div></div><div></div><div>짧은 한 줄, 그리고 충분한 여백은 독자에게 시각적 쉼표를 제공하며,</div><div></div><div></div><div></div><div></div><div>감정을 담은 일러스트나 사진과 함께 사용하면 더욱 효과적입니다.</div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div class="markdown-title2">무드보드 구성 시 다음과 같은 요소를 포함해 보세요:</div><div></div><div></div><div></div><div></div><div>🤍 흰 배경과 여백 중심의 레이아웃</div><div></div><div></div><div></div><div></div><div>✍️ 감성적인 손글씨 또는 명조 서체 사용</div><div></div><div></div><div></div><div></div><div>🌿 자연색감 기반의 풍경, 사람, 일상 사진 조합</div><div></div><div></div><div></div><div></div><div>💌 시적인 카피, 짧은 감성 문장 중심</div><div></div><div></div><div></div><div></div><div>📚 따뜻한 톤의 베이지, 크림색 배경 활용</div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div>이 스타일은 뉴스보다는 에세이형 콘텐츠, 작가 브랜드, 감성 블로그 기반 서비스에서 매우 효과적으로 사용될 수 있습니다.</div><div></div><div>사용자와 감정을 공유하는 콘텐츠가 필요한 브랜드라면 꼭 참고할 만한 스타일입니다.</div>`,
    category: "카드뉴스",
    date: "2025-06-03",
    imageUrl:
      "https://i.pinimg.com/736x/4c/5c/3f/4c5c3f19624f366cc104373bf468e833.jpg",
    description: "흰 배경 위에 감성적인 타이포와 이미지",
    views: 0,
    isRecommended: false,
    keywords: ["따듯한", "자연", "감성적"],
  },
  {
    id: 15,
    title: "축제 포스터",
    slug: "축제-포스터",
    content: `<div class="markdown-title1">일러스트와 비비드 컬러가 춤추는 
순간</div><div></div><div></div><div class="markdown-title2">축제는 젊음의 자유와 에너지를 표현하는 무대입니다.</div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div>포스터에서는 다양한 색상, 일러스트, 만화 같은 타이포가 자유롭게 활용되며, 메시지 전달보다 분위기 형성에 초점이 맞춰집니다.</div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div>일러스트 스타일은 손그림 또는 키치한 90년대 느낌도 어울리고, 글자와 그림이 섞여 있는 콜라주 형식도 자주 활용됩니다.</div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div>🌈 비비드한 원색 계열 컬러 (핑크, 옐로우, 민트 등)</div><div></div><div>🎨 손그림 또는 아기자기한 캐릭터 일러스트</div><div></div><div>🔠 유쾌하고 둥근 타이포 (예: rounded, cute)</div><div></div><div>🎭 드로잉 + 사진 + 그래픽 혼합 콜라주 스타일</div><div></div><div>🧃 댄스, 공연, 불꽃놀이 등 활동성을 상징하는 오브제</div><div></div><div></div><div></div><div></div><div>MZ 세대를 위한 이벤트, 대학교 행사, 뮤직파티에 최적이며, 무드보드에는 역동성, 움직임, 캐릭터 중심의 이미지와 밝은 색감을 함께 구성해보세요.</div>`,
    category: "포스터",
    date: "2025-06-03",
    imageUrl:
      "https://i.pinimg.com/736x/e9/b4/99/e9b499ca682c0b5bf9c708963b0e2917.jpg",
    description: "젊고 활기찬 에너지의 상징",
    views: 1,
    isRecommended: false,
    keywords: ["캐주얼", "비비드", "밝은"],
  },
  {
    id: 16,
    title: " 블렌디드 컬러 ",
    slug: "블렌디드-컬러",
    content: `<div class="markdown-title1">블렌디드 컬러란</div><div></div><div></div><div></div><div></div><div>색상 간 경계가 흐릿하게 섞이며 자연스럽게 
이어지는 컬러 표현 방식입니다.</div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div>그라데이션과 유사하지만,</div><div></div><div>조금 더 감성적이고 회화적인 느낌을 주며,</div><div></div><div>부드러운 시각 경험을 유도합니다.</div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div>포스터, 브랜드 배경, 일러스트 등에서 몽환적이거나 감성적인 분위기를 표현할 때 주로 사용됩니다.</div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div>🌈 색상 간의 자연스러운 연결</div><div></div><div>💟 부드러운 흐름, 겹침, 반투명 효과 활용</div><div></div><div>☁️ 하늘, 자연, 감정 테마 배경과 잘 어울림</div><div></div><div>🎨 유화 느낌의 붓터치 표현 가능</div><div></div><div>🪞 빛이나 구름 같은 감각적 오브제와 조합 우수</div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div>감성 브랜딩이나 로맨틱, 몽환적 무드를 위한 무드보드 구성 시 핵심이 되는 시각적 표현입니다.</div>`,
    category: "용어사전",
    date: "2025-06-04",
    imageUrl:
      "https://i.pinimg.com/736x/2a/ba/0d/2aba0ded21f8425edb522c1d1759dc12.jpg",
    description: "Blended Color~",
    views: 770,
    isRecommended: false,
    keywords: ["감성적", "파스텔", "하늘색"],
  },
  {
    id: 17,
    title: "인터랙션 ! GSAP",
    slug: "인터랙션-GSAP",
    content: `<div class="markdown-title1">그냥 스크롤하지 말고 ‘보여줘’야 돼</div><div></div><div>요즘 웹사이트 보면 스크롤 따라 배경 색이 바뀌고, 요소들이 하나씩 등장하거나 사라지지? 그게 요즘 웹 트렌드에요. 움직임이 정체성을 말해줘요.</div><div></div><div>특히 브랜드가 정적인 인상이면, 인터랙션으로 역동성을 더해줄 수 있어요.</div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div class="markdown-title1">구성 방법</div><div></div><div>페이지 전환 없이 스크린 내에서 움직임 유지</div><div></div><div>요소는 ‘등장’, ‘확대’, ‘회전’, ‘사라짐’으로 다양하게 표현 가능! </div><div></div><div>컬러는 배경이 살아있을수록 인터랙션 효과가 좋아요</div><div></div><div>폰트는 굵은 고딕 or 깔끔한 산세리프, 블러 효과 추가하면 베스트!!</div><div></div><div></div><div></div><div>피그마의 프로토타입을 통해 시연해볼 수도 있고</div><div></div><div></div><div></div><div></div><div>참고할 레퍼런스가 필요하다면</div><div class="markdown-title2">GSAP</div><div>사이트를 추천할게요!!</div>바로 적용시켜볼 수도 있고 참고 할 수 있는 예시들도 아주 많아요.<div></div><div></div><div></div><div></div><div class="markdown-title1">사용되는 콘텐츠</div><div></div><div>에이전시 홈페이지, 브랜드 랩 쇼케이스, IT기업 소개 웹, 디자이너 포트폴리오 등 이곳저곳에서 쉽게 볼 수 있어요.</div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>`,
    category: "트렌드",
    date: "2025-06-03",
    imageUrl:
      "https://i.pinimg.com/736x/15/ab/e1/15abe1570219337a6e075d185f1312d7.jpg",
    description: "이제는 움직임이 당연해! 인터랙션",
    views: 200,
    isRecommended: false,
    keywords: ["감각적", "움직임", "GSAP"],
  },
  {
    id: 18,
    title: "모던 전시 아트 포스터",
    slug: "전시의-철학과-예술성을-시각적으로-압축한-작품",
    content: `<div class="markdown-title1">모던 전시 아트 포스터는!!!</div>><div></div><div></div><div></div>


단순히 전시를 홍보하는 광고물이 아니라, 전시의 철학과 예술성을 시각적으로 압축해 놓은 미니어처 작품이에요! 가장 현대적인 감각과 실험 정신이 녹아있는 디자인이죠. <div></div><div></div>

<div class="markdown-title2">최신 디자인 트렌드를 반영하는 요소는</div><div></div><div></div><div></div>

<div class="markdown-body1">과거의 틀에서 벗어나 타이포그래피를 이미지처럼 사용하는 것이 핵심이에요. 글꼴의 크기, 굵기, 위치를 의도적으로 과장하거나, 텍스트 자체에 애니메이션이나 질감을 넣어 강렬한 시각적 충격을 주죠. 이는 '키네틱 타이포그래피'의 영향이기도 해요.</div>
<div></div><div></div><div></div><div></div><div></div><div></div>
또한, 추상 미술의 영향을 받아 전시 작품을 그대로 보여주기보다는, 전시가 담고 있는 메시지나 감정을 추상적인 색상 팔레트, 기하학적 형태, 또는 독특한 질감으로 표현하여 호기심을 유발해요.<div></div><div></div><div></div><div></div><div></div><div></div>

<div class="markdown-title2">무드보드 제작 시 집중해야 할 요소들이에요!</div>
<div></div><div></div><div></div><div></div>
🔠 몰입형 타이포그래피: 글자 자체가 
디자인의 주인공이에요. 볼드하고 대담한 서체를 활용하거나, 텍스트에 메탈릭, 3D 질감을 부여하여 고급스럽고 미래적인 느낌을 강조하죠.
<div></div><div></div><div></div><div></div>
⚫️ 미니멀 & 맥시멀 공존: 깨끗한 화이트 큐브 같은 넓은 여백(미니멀리즘)과 대비되는, 강렬한 색상 대비나 화려한 디테일(맥시멀리즘)을 결합하여 시각적인 긴장감을 조성해요.
<div></div><div></div><div></div><div></div>
🌈 색상 심리학 활용: 작품이나 주제에 따라 톤 다운된 차분한 색상(지속 가능성)을 쓰거나, 혹은 네온이나 형광색(Y2K/미래 감성)으로 시선을 사로잡는 등, 색상으로 감정을 직접적으로 전달한답니다.
<div></div><div></div><div></div><div></div>
📜 아날로그 질감: 손으로 그린 듯한 일러스트나 거친 브러시 터치, 심지어 포스터 자체의 재질을 친환경적이거나 독특한 종이로 선택하여 아날로그적인 깊이와 진정성을 더하는 것도 중요해요.
<div></div><div></div><div></div><div></div>
(이미지: pinterest)
`,
    category: "포스터",
    date: "2025-11-03",
    imageUrl:
      "https://i.pinimg.com/1200x/30/14/07/301407afdcc5b496931f16d24959ed02.jpg",
    description: "전시의 철학과 예술성을 시각적으로 압축한 작품",
    views: 0,
    isRecommended: true,
    keywords: ["감각적", "모던", "추상적"],
  },
  {
    id: 19,
    title: "aeae 이어폰/인이어 굿즈",
    slug: "기능적-형태를-소속감과-경험을-파는-액세서리로",
    content: `<div class="markdown-title1">AEAE 이어폰과 K-POP 굿즈 디자인, 핵심 공통점은!!!</div><div></div><div></div>
<div class="markdown-body1">최근 큰 이슈가 되었던 AEAE 유선 이어폰을 아시나요?
<div></div><div></div><div></div><div></div><div></div>
이와 관련해 아일릿, 데이식스 등의 인이어(In-Ear) 굿즈는 세 가지 명확한 디자인 언어를 공유하고 있어요!
현시대의 소비자가 '기술' 대신 '감성''과 '경험'을 구매한다는 강력한 증거랍니다.</div><div></div><div></div><div></div>

<div class="markdown-title2">1.
'Y2K/뉴트로'를 넘어선 아이코닉 쉐이프(Iconic Shape)의 복각이에요!</div><div></div><div></div><div></div>

🔍 트렌드 분석: AEAE가 유선 이어폰을 선택한 것은 단순히 Y2K 복고를 따라 한 것이 아니에요.
바로 '유선 이어폰'이라는 투박하고 기능적인 형태 자체가 주는 아이코닉함을 패션으로 끌어올린 것이죠.
무선 이어폰이 미니멀하게 '사라지려고' 할 때, 유선은 '확실하게 존재감'을 드러내는 반대 전략인 거예요!<div></div><div></div><div></div><div></div>
<div></div>
🔗 공통점 (아이돌 굿즈): 아이돌 인이어 굿즈는 '무대 위 전문가용 장비'의 형태를 차용했어요.
이는 '프로페셔널하고 특별한' 형태를 일상으로 가져와 아이돌과의 동일시를 느끼게 하는 강력한 스토리텔링이죠.<div></div><div></div><div></div><div></div>

💡 디자이너 인사이트: 기능에 충실했던 과거의 형태 (Shape)가 현대의 아이코닉한 상징이 될 수 있다는 점을 주목해야 해요.
낡은 물건의 형태에서 디자인 영감을 찾아보는 건 어떨까요?<div></div><div></div><div></div><div></div>
<div></div><div></div>
<div class="markdown-title2">2. 텍스처와 패턴을 통한 '촉각적 개성'의 극대화예요!</div><div></div><div></div><div></div><div></div><div></div>

🔍 트렌드 분석: AEAE 이어폰은 단색을 탈피하고 도트나 체커보드 같은 패턴을 입혔어요.
이는 손에 잡히는 작은 기기에 브랜드의 아이덴티티와 개성을 강렬하게 주입하는 방법이죠.
<div></div><div></div>

🔗 공통점 (아이돌 굿즈): 아이돌 굿즈에서는 일반적인 디자인이 아닌 인이어와 유사한 디자인을 사용했어요.
이어팁이나 케이블 마감재에 아티스트만의 독특한 색상이나 질감을 적용하기도 합니다. 또한, 커스텀 스티커 등을 제공하여 소비자가 직접 '텍스처 레이어'를 쌓을 수 있게 하죠.<div></div><div></div>

💡 디자이너 인사이트: 미니멀리즘이 놓쳤던 '재질감(Texture)'과 '패턴(Pattern)'의 힘을 극대화해야 해요.
무드보드에 유광, 무광, 입체 패턴 등 다양한 질감 요소를 대비시켜 연관성을 찾아보는 게 중요해요.<div></div><div></div>
<div></div><div></div>
<div class="markdown-title2">3.
'소속감'을 파는 스토리텔링 디자인이 핵심이에요!</div><div></div><div></div><div></div>

🔍 트렌드 분석: AEAE 이어폰은 특정 '힙한 스트리트 컬처'를 대변해요.
이 이어폰을 사용하는 것은 그 커뮤니티의 일원임을 암시하는 '소셜 시그널'이죠.<div></div><div></div><div></div>

🔗 공통점 (인이어 굿즈): 굿즈는 팬들이 '내가 이 아티스트의 팬이다'라는 소속감을 일상에서 자연스레 드러내게 해주는 가장 강력한 매개체예요.
아이돌이 사용하는 오브제인 인이어를 굿즈 형태로 소유함으로써 심리적 연결을 강화하고 소속감을 느끼게 해주는 것이죠!<div></div><div></div><div></div>

💡 디자이너 인사이트: 디자인 요소 하나하나가 '나의 취향과 정체성'을 반영할 수 있도록 설계해야 해요.
작은 로고 플레이나 심볼릭 컬러 하나가 강력한 브랜드 충성도를 만들어낸다는 점을 기억하세요!<div></div><div></div><div></div>
<div></div><div></div><div class="markdown-body1">
(사진 : pinterest)</div>`,
    category: "트렌드",
    date: "2025-11-03",
    imageUrl:
      "https://i.pinimg.com/736x/3a/0f/b2/3a0fb22aa57f69dc5bcb0e59e02e6bb6.jpg",
    description: "'기능적 형태'를 '소속감과 경험을 파는 액세서리'로",
    views: 0,
    isRecommended: true,
    keywords: ["감성", "경험", "질감"],
  },
  {
    id: 20,
    title: "신뢰를 주는 토스",
    slug: "신뢰를-주는-토스",
    content: `<div class="markdown-title1">들어가며 🔍</div><div></div><div class="markdown-body1">토스는 군더더기 없이 깔끔한 미니멀리즘 UI의 대표주자입니다.
무드보드를 만들 때 '신뢰감'을 시각적으로 전달하고 싶다면 이 스타일이 적합합니다.</div><div></div><div></div><div></div><div></div><div class="markdown-title2">구조</div><div></div><div class="markdown-body1">시각적 요소는 최대한 단순화하고,</div><div></div><div class="markdown-body1">불필요한 장식을 줄이며,</div><div></div><div class="markdown-body1">여백과 계층구조 중심으로 설계합니다.</div><div></div><div></div><div class="markdown-title2">컬러</div><div class="markdown-body1">또한 파란색 계열의 메인 컬러는 신뢰와 차분함을 느끼게 해줍니다.
이 UI는 금융서비스처럼 정확성과 안정성을 강조해야 하는 분야에 이상적입니다.</div><div></div><div></div><div></div><div class="markdown-title2">무드보드 제작 시에는 다음과 같은 시각요소를 포함해보세요:</div><div></div><div class="markdown-body1">✅ 많은 여백과 여유로운 구성</div><div></div><div class="markdown-body1">✅ 차분한 블루 계열 메인컬러</div><div></div><div class="markdown-body1">✅ 직관적인 아이콘 및 버튼</div><div></div><div class="markdown-body1">이런 스타일은 금융, 보험, 헬스케어 등 신뢰가 핵심 가치인 서비스에 매우 적합합니다.</div><div></div><div></div><div></div>`,
    category: "UI",
    date: "2025-06-02",
    imageUrl:
      "https://i.pinimg.com/736x/ad/b4/3f/adb43f8ef53f7f59ddb3916fa6116d63.jpg",
    description: "믿음을 주는 UI, 바로 토스",
    views: 120,
    isRecommended: true,
    keywords: ["미니멀", "블루", "신뢰"],
  },
  {
    id: 21,
    title: "톡톡 튀고 재치있는 카뉴",
    slug: "톡톡-튀고-재치있는-카뉴",
    content: `<div>Z세대는 정보 습득보다 경험, 감정, 공감에 더 집중하는 세대입니다.
그들은 감각적이고 직관적인 카드뉴스를 선호하며, 밈, 컬러, 이모지 등 디지털 문화에 익숙한 언어를 통해 소통합니다.</div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div>짧은 텍스트, 감각적인 색상 조합, 드립이 들어간 문장 구성, 그리고 픽셀 또는 90년대 레트로 스타일의 그래픽이 주요 포인트입니다.</div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div>무드보드 구성 시 참고할 요소:</div><div></div><div>🧃 형광 핑크, 라임 그린 같은 네온 계열 색상</div><div></div><div>😆 밈, 말풍선, 유머 가득한 대사 그래픽</div><div></div><div>🐸 패턴 배경과 스티커, 이모지의 믹스</div><div></div><div>📱 모바일 중심 UI에 최적화된 가독성</div><div></div><div>🧢 90년대 레트로 키치 스타일 타이포나 캐릭터</div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div>이 스타일은 젊은 세대를 겨냥한 브랜드, MZ 타깃 콘텐츠, 대학 이벤트, 문화 관련 캠페인에서 효과적으로 쓰일 수 있습니다.</div>`,
    category: "카드뉴스",
    date: "2025-05-26",
    imageUrl:
      "https://i.pinimg.com/736x/dd/23/18/dd2318b65464e95953ad0b753f36605a.jpg",
    description: "컬러풀하고 짧은 유머 가득한 카드뉴스",
    views: 20,
    isRecommended: false,
    keywords: ["네온", "사람", "트렌디"],
  },
  {
    id: 22,
    title: "무드보드란 무엇일까",
    slug: "디자인의-완성도를-높이려면-꼭",
    content: `<div class="markdown-title1">🎨 무드보드란!!!</div>

이미지, 텍스트 및 구성의 개체 샘플로 이루어진 일종의 
시각적 프레젠테이션 또는 '콜라주'에요.

<div class="markdown-title2">정의 및 구성 요소</div>

<div class="markdown-body1">사진, 패턴, 폰트, 키워드, 컬러 등을 콜라주하여 하나의 보드에 아이디어를 시각화하여 표현하는 도구입니다.</div>

<div class="markdown-title2">무드보드를 만드는 이유:</div>

📌 방향성 설정: 디자인 초기 아이디어를 구체화하고 전체적인 디자인 컨셉을 확립합니다.
💡 소통 및 공유: 디자이너와 팀원, 클라이언트 간의 주관적인 느낌을 객관적인 시각 언어로 통일하여 소통 오류를 줄입니다.
🛡️ 위험 최소화: 세부 작업에 앞서 디자인 방향에 대한 합의를 이끌어내어 실패를 방지하고 시간과 비용을 절약합니다.
혼자 작업하거나, 함께 작업하거나 ! 무드보드는 디자인을 효율적으로 그리고 완성도 높게 만들어주는 역할을 해요.
중요한 디자인의 첫 걸음 
무무와 함께 만들어보아요! 

(이미지 출처 : pinterest)`,
    category: "용어사전",
    date: "2025-11-03",
    imageUrl:
      "https://i.pinimg.com/736x/16/30/1f/16301f0732122d2ba0e5f2a154dad306.jpg",
    description: "디자인에서 빠질 수 없는 존재",
    views: 0,
    isRecommended: true,
    keywords: ["무드보드", "일관성", "시각화"],
  },
];
