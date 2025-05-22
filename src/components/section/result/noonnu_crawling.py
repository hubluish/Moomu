# 가은
# Noonnu 사이트에서 여러 카테고리별로 폰트 정보를 크롤링 후 JSON 파일로 저장하는 코드입니다.

from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import json
import time

# 크롤링할 폰트 카테고리 리스트 (검색어로 사용)
CATEGORIES = [
    "기본 고딕", "문서용", "제목용", "장식체", "꽉찬 고딕", "둥근 고딕", "바탕체", "귀여운", "장식 고딕", "굴린 고딕",
    "독특한", "또박또박", "동글동글", "붓글씨", "캘리그라피", "삐뚤빼뚤", "명조", "가로로 긴", "두꺼운", "어른 손글씨",
    "고전체", "각진 바탕", "책 서체", "클래식", "둥근 바탕", "레트로", "이탤릭", "각진 손글씨", "손글씨 바탕", "탈네모꼴",
    "각진 장식체", "둥근 손글씨", "장식 바탕", "손글씨 고딕", "펜", "아이 손글씨", "마카", "영문", "픽셀 도트", "각진 명조",
    "기울어진", "키가 큰", "화려한", "코딩 폰트", "옛날 한글", "판타지", "네모 폰트", "궁서체", "둥근 명조", "테두리",
    "색연필", "꼬인 글자", "감성적인", "크레파스", "무늬 폰트", "끊어진", "장식 손글씨", "브랜드 폰트", "모서리 접힌",
    "별모양", "입체감", "필기체", "물결", "뿔", "스포츠", "복실복실", "컬러", "캐릭터", "구름", "강아지", "그림자 폰트",
    "분필", "디지털"
]
# 크롬 드라이버 옵션 설정 (백그라운드 실행)
options = Options()
options.add_argument("--start-maximized")
options.add_argument("--headless")  # 창을 띄우지 않고 백그라운드에서 실행
options.add_argument("--disable-gpu")  # (윈도우에서 headless 안정성)

# 크롬 드라이버 경로 지정
service = Service("D:/chromedriver.exe")
driver = webdriver.Chrome(service=service, options=options)

all_results = {} # 카텥고리별 결과를 저장할 딕셔너리

# 각 카테고리별로 반복해서 크롤링
for category in CATEGORIES:
    driver.get("https://noonnu.cc") # 눈누 사이트 접속

    # 검색창이 나타날 때까지 대기
    search_box = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.CSS_SELECTOR, "input[placeholder='폰트 이름 및 제작자로 검색']"))
    )
    search_box.clear() #검색창 비우기
    search_box.send_keys(category) # 카테고리명 입력
    search_box.send_keys(Keys.ENTER) #엔터로 검색 

    try:
        # 폰트 카드들 로드될 때까지 대기 
        font_cards = WebDriverWait(driver, 10).until(
            EC.presence_of_all_elements_located((By.XPATH, "//div[contains(@class, 'min-w-[300px]')]"))
        )
    except Exception:
        # 검색결과 없을경우 빈 카테고리로 추출
        all_results[category] = []
        print(f"{category} 끝!") 
        continue

    results = [] #현재 카테고리의 결과 리스트 
    for font in font_cards:
        try:
            # 각 폰트 카드에서 상세페이지 링크 <a> 찾기 
            link_tag = font.find_element(By.TAG_NAME, "a")
            font_link = link_tag.get_attribute("href")
            if not font_link.startswith("http"):
                font_link = "https://noonnu.cc" + font_link
            
            # 미리보기 이미지 정보 가져오기
            img_tag = link_tag.find_element(By.TAG_NAME, "img")
            image_src = img_tag.get_attribute("src")
            image_alt = img_tag.get_attribute("alt")

            #결과 리스트에 추가
            results.append({
                "font_link": font_link,
                "image_link": image_src,
                "image_alt": image_alt
            })
        except Exception:
            # 광고 등 폰트 카드가 아닌 경우 무시
            continue
    all_results[category] = results # 카테고리 별 결과 저장
    print(f"{category} 끝!") 
    time.sleep(1)  # 서버에 부담을 주지 않기 위해 1초 대기

# 모든 결과를 JSON 파일로 저장 (한글 깨짐 방지)
with open("noonnu_fonts.json", "w", encoding="utf-8") as f:
    json.dump(all_results, f, ensure_ascii=False, indent=2)

driver.quit()