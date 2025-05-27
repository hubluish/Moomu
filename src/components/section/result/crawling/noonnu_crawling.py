from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import json

SEARCH_KEYWORD = "손글씨"

options = Options()
options.add_argument("--start-maximized")

service = Service("D:/chromedriver.exe")
driver = webdriver.Chrome(service=service, options=options)

driver.get("https://noonnu.cc")

search_box = WebDriverWait(driver, 10).until(
    EC.presence_of_element_located((By.CSS_SELECTOR, "input[placeholder='폰트 이름 및 제작자로 검색']"))
)
search_box.send_keys(SEARCH_KEYWORD)
search_box.send_keys(Keys.ENTER)

# 검색 결과의 폰트 카드들이 나타날 때까지 명확하게 기다리기
font_cards = WebDriverWait(driver, 10).until(
    EC.presence_of_all_elements_located((By.XPATH, "//div[contains(@class, 'min-w-[300px]')]"))
)

print(f"폰트 카드 개수: {len(font_cards)}")
print(font_cards[0].get_attribute("outerHTML")[:500])  # 카드 첫 부분 확인

results = []
for font in font_cards:
    try:
        link_tag = font.find_element(By.TAG_NAME, "a")
        font_link = link_tag.get_attribute("href")
        if not font_link.startswith("http"):
            font_link = "https://noonnu.cc" + font_link

        img_tag = link_tag.find_element(By.TAG_NAME, "img")
        image_src = img_tag.get_attribute("src")
        image_alt = img_tag.get_attribute("alt")

        results.append({
            "font_link": font_link,
            "image_link": image_src,
            "image_alt": image_alt
        })
    except Exception as e:
        # 광고 등 폰트 카드가 아닌 경우 무시
        continue

with open("noonnu_fonts.json", "w", encoding="utf-8") as f:
    json.dump(results, f, ensure_ascii=False, indent=2)

print(json.dumps(results, ensure_ascii=False, indent=2))
driver.quit()