from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
import time
import json
import os

# 설정
USERNAME = 'developer5ssu@gmail.com'  # 본인 Pinterest 이메일
PASSWORD = '1408013618'           # 본인 Pinterest 비밀번호
SEARCH_KEYWORD = 'pastel dreamy minimal handwritten'         # 검색 키워드

# 브라우저 열기
options = webdriver.ChromeOptions()
options.add_argument("--start-maximized")
driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)

# Pinterest 접속 및 로그인
driver.get('https://www.pinterest.com/login/')
time.sleep(2)

email_input = driver.find_element(By.NAME, 'id')
password_input = driver.find_element(By.NAME, 'password')
email_input.send_keys(USERNAME)
password_input.send_keys(PASSWORD)
password_input.send_keys(Keys.RETURN)
time.sleep(7)

# 검색창에서 키워드 검색
search_box = driver.find_element(By.NAME, 'searchBoxInput')
search_box.send_keys(SEARCH_KEYWORD)
search_box.send_keys(Keys.RETURN)
time.sleep(5)

# 스크롤 다운 (더 많은 이미지 로드)
for _ in range(5):
    driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
    time.sleep(2)

# 이미지 미리보기 + 링크 추출 (최대 18개)
results = []
pins = driver.find_elements(By.CSS_SELECTOR, 'a[href*="/pin/"]')
count = 0

for pin in pins:
    try:
        img = pin.find_element(By.TAG_NAME, 'img')
        thumb_url = img.get_attribute('src')
        pin_link = pin.get_attribute('href')
        if thumb_url and pin_link and 'pinimg.com' in thumb_url:
            results.append({
                "thumbnail_url": thumb_url,
                "pin_url": pin_link
            })
            count += 1
            if count >= 18:
                break
    except:
        continue

# JSON 파일로 저장
save_path = "src/components/section/result/pinterest_images.json"
os.makedirs(os.path.dirname(save_path), exist_ok=True)

with open(save_path, "w", encoding="utf-8") as f:
    json.dump(results, f, ensure_ascii=False, indent=2)

print(f"{len(results)}개의 이미지가 저장되었습니다. → {save_path}")
driver.quit()