
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
    "기본 고딕",
    "문서용",
    "제목용",
    "장식체",
    "꽉찬 고딕",
    "둥근 고딕",
    "바탕체",
    "귀여운",
    "장식 고딕",
    "굴린 고딕",
    "독특한",
    "또박또박",
    "동글동글",
    "붓글씨",
    "캘리그라피",
    "삐뚤빼뚤",
    "명조",
    "가로로 긴",
    "두꺼운",
    "어른 손글씨",
    "고전체",
    "각진 바탕",
    "책 서체",
    "클래식",
    "둥근 바탕",
    "레트로",
    "이탤릭",
    "각진 손글씨",
    "손글씨 바탕",
    "탈네모꼴",
    "각진 장식체",
    "둥근 손글씨",
    "장식 바탕",
    "손글씨 고딕",
    "펜",
    "아이 손글씨",
    "마카",
    "영문",
    "픽셀 도트",
    "각진 명조",
    "기울어진",
    "키가 큰",
    "화려한",
    "코딩 폰트",
    "옛날 한글",
    "판타지",
    "네모 폰트",
    "궁서체",
    "둥근 명조",
    "테두리",
    "색연필",
    "꼬인 글자",
    "감성적인",
    "크레파스",
    "무늬 폰트",
    "끊어진",
    "장식 손글씨",
    "브랜드 폰트",
    "모서리 접힌",
    "별모양",
    "입체감",
    "필기체",
    "물결",
    "뿔",
    "스포츠",
    "복실복실",
    "컬러",
    "캐릭터",
    "구름",
    "강아지",
    "그림자 폰트",
    "분필",
    "디지털"
]

# 크롬 드라이버 옵션 설정 (백그라운드 실행)
options = Options()
options.add_argument("--start-maximized")
# options.add_argument("--headless")  # 창을 띄우지 않고 백그라운드에서 실행
options.add_argument("--disable-gpu")  # (윈도우에서 headless 안정성)

# 크롬 드라이버 경로 지정
service = Service("D:/chromedriver.exe")
driver = webdriver.Chrome(service=service, options=options)

all_results = {} # 카텥고리별 결과를 저장할 딕셔너리

# 각 카테고리별로 반복해서 크롤링
for category in CATEGORIES:
    retry_count = 0
    while True:
        driver.get("https://noonnu.cc")  # 눈누 사이트 접속

        # 검색창이 나타날 때까지 대기
        search_box = WebDriverWait(driver, 3).until(
            EC.presence_of_element_located((By.CSS_SELECTOR, "input[placeholder='폰트 이름 및 제작자로 검색']"))
        )
        search_box.clear()
        search_box.send_keys(category)
        search_box.send_keys(Keys.ENTER)

        # --- 스크롤을 끝까지 내림 ---
        last_height = driver.execute_script("return document.body.scrollHeight")
        while True:
            driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
            time.sleep(1.2)  # 로딩 대기 (필요시 1.5~2초로 늘려도 됨)
            new_height = driver.execute_script("return document.body.scrollHeight")
            if new_height == last_height:
                break
            last_height = new_height

        # 모든 폰트 카드 한 번에 수집
        try:
            # font_cards = driver.find_elements(By.XPATH, "//div[contains(@class, 'min-w-[300px]')]")
            font_cards = driver.find_elements(By.XPATH, "//div[contains(@class, 'group') and contains(@class, 'flex-col')]")
        except Exception:
            all_results[category] = []
            print(f"{category} success!")
            break

        results = []
        seen_links = set()
        for font in font_cards:
            try:
                # <a> 태그 찾기 (class, data-turbolinks 등 상관없이 첫 번째 <a> 사용)
                link_tags = font.find_elements(By.TAG_NAME, "a")
                link_tag = None
                for a in link_tags:
                    href = a.get_attribute("href")
                    if href and "/font_page/" in href:
                        link_tag = a
                        break
                if not link_tag:
                    continue

                font_link = link_tag.get_attribute("href")
                if not font_link.startswith("http"):
                    font_link = "https://noonnu.cc" + font_link

                if font_link in seen_links:
                    continue

                # <img> 태그 찾기 (a 태그 하위 모든 img 대상)
                img_tag = link_tag.find_element(By.XPATH, ".//img")
                image_src = img_tag.get_attribute("src")
                image_alt = img_tag.get_attribute("alt")

                results.append({
                    "font_link": font_link,
                    "image_link": image_src,
                    "image_alt": image_alt
                })
                seen_links.add(font_link)
            except Exception:
                continue

        all_results[category] = results
        print(f"{category} success! ({len(results)}개 저장됨)")
        break

# 모든 결과를 JSON 파일로 저장 (한글 깨짐 방지)
with open("noonnu_fonts.json", "w", encoding="utf-8") as f:
    json.dump(all_results, f, ensure_ascii=False, indent=2)

driver.quit()
# ...생략...
results = []
seen_links = set()
for font in font_cards:
    try:
        # <a> 태그 찾기 (href에 /font_page/가 포함된 것)
        link_tags = font.find_elements(By.TAG_NAME, "a")
        link_tag = None
        for a in link_tags:
            href = a.get_attribute("href")
            if href and "/font_page/" in href:
                link_tag = a
                break
        if not link_tag:
            continue

        font_link = link_tag.get_attribute("href")
        if not font_link.startswith("http"):
            font_link = "https://noonnu.cc" + font_link

        if font_link in seen_links:
            continue

        # <img> 태그 찾기 (a 태그 하위 모든 img 중 alt, src가 있는 첫 번째)
        img_tags = link_tag.find_elements(By.XPATH, ".//img")
        img_tag = None
        for img in img_tags:
            if img.get_attribute("src") and img.get_attribute("alt"):
                img_tag = img
                break
        if not img_tag:
            continue

        image_src = img_tag.get_attribute("src")
        image_alt = img_tag.get_attribute("alt")

        results.append({
            "font_link": font_link,
            "image_link": image_src,
            "image_alt": image_alt
        })
        seen_links.add(font_link)
    except Exception:
        continue
# ...생략...
results = []
seen_links = set()
for font in font_cards:
    try:
        link_tags = font.find_elements(By.TAG_NAME, "a")
        link_tag = None
        for a in link_tags:
            href = a.get_attribute("href")
            if href and "/font_page/" in href:
                link_tag = a
                break
        if not link_tag:
            continue

        font_link = link_tag.get_attribute("href")
        if not font_link.startswith("http"):
            font_link = "https://noonnu.cc" + font_link

        if font_link in seen_links:
            continue

        img_tag = link_tag.find_element(By.XPATH, ".//img")
        image_src = img_tag.get_attribute("src")
        image_alt = img_tag.get_attribute("alt")

        results.append({
            "font_link": font_link,
            "image_link": image_src,
            "image_alt": image_alt
        })
        seen_links.add(font_link)
    except Exception:
        continue
