from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager
import json
import time
import os

def fetch_colorhunt_palette(keywords_list):
    options = Options()
    # 주석 없애면 브라우저 창이 보이지 않게 실행됨
    # options.add_argument("--headless=new")
    options.add_argument("--no-sandbox")
    options.add_argument("--disable-dev-shm-usage")
    options.add_argument("--window-size=800,600")

    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)
    results = []

    for keyword_set in keywords_list:
        driver.get("https://colorhunt.co/")
        time.sleep(1.5)

        for keyword in keyword_set:
            try:
                try:
                    search_box = driver.find_element(By.CSS_SELECTOR, "input[placeholder='Add tag']")
                except:
                    search_box = driver.find_element(By.CSS_SELECTOR, "input[placeholder='Search palettes']")
                search_box.send_keys(keyword)
                search_box.send_keys(Keys.ENTER)
                time.sleep(0.3)
            except Exception as e:
                print(f"[에러] '{keyword}' 입력 실패: {e}")
                results.append({
                    "keywords": keyword_set,
                    "error": f"키워드 '{keyword}' 입력 중 오류 발생: {e}"
                })
                break

        try:
            palette_div = driver.find_element(By.CSS_SELECTOR, 'div.item[data-index="0"]')
            data_code = palette_div.get_attribute("data-code")
            hex_colors = [f"#{data_code[i:i+6]}" for i in range(0, len(data_code), 6)]
            palette_url = f"https://colorhunt.co/palette/{data_code}"

            results.append({
                "keywords": keyword_set,
                "palette_link": palette_url,
                "colors": hex_colors
            })

        except Exception as e:
            print(f"[팔레트 div 에러] {e}")
            results.append({
                "keywords": keyword_set,
                "palette_link": None,
                "colors": [],
                "error": f"data-code 수집 실패: {e}"
            })

    driver.quit()

    BASE_DIR = os.path.dirname(os.path.abspath(__file__))
    output_path = os.path.join(BASE_DIR, "colorhunt_palettes.json")
    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(results, f, indent=2, ensure_ascii=False)

    return results


# 실행 예시
keywords_list = [
    ["Pastel", "Cream", "Skin"],
    ["Pastel", "Pink", "Peach"],
    ["Pastel", "Mint", "Light"]
]

palettes = fetch_colorhunt_palette(keywords_list)
for p in palettes:
    print(json.dumps(p, indent=2, ensure_ascii=False))