from driver import Scraper
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.common.exceptions import JavascriptException

import undetected_chromedriver as uc

from time import sleep

uc_options = uc.ChromeOptions()
# uc_options.add_argument("--start-maximized")
uc_options.add_argument("--disable-popup-blocking")
driver = Scraper(uc.Chrome(options=uc_options), "client")

start_letter = "M"
driver.load("https://www2.tirexo.work/?do=index_alpha&category=32&lettre=" + start_letter)

max = str(driver.js_cmd(open("scrap_cmd/for_tirexo/tirexo/get_max.js").read()))
min = str(1)
current = str(int(int(max) / 2))

open("scrap_cmd/for_tirexo/tirexo/tmp/boundaries.js", "w+").write("const min = " + min + "\n" + "const max = " + max + "\n" + "const current_page = " + current)

driver.load("https://www2.tirexo.work/?do=index_alpha&category=32&lettre="+ start_letter + "&cstart=" + current)

result = driver.js_cmd(open("tmp/consts.js").read() + "\n" + open("scrap_cmd/for_tirexo/tirexo/tmp/boundaries.js").read() + "\n" + open("scrap_cmd/for_tirexo/tirexo/search_alpha_v2.js").read())

while True:
    if result == "ok" or result == "=":
        break

    if result == "+":
        if (max == current):
            print("Error")
            break
        min = current
        current = str(int((int(max) - int(min)) / 2) + int(min))
    elif result == "-":
        if (min == current):
            print("Error")
            break
        max = current
        current = str(int((int(max) - int(min)) / 2) + int(min))
    else:
        print("Error")
        break
    
    open("scrap_cmd/for_tirexo/tirexo/tmp/boundaries.js", "w").write("const min = " + min + "\n" + "const max = " + max + "\n" + "const current_page = " + current)

    driver.load("https://www2.tirexo.work/?do=index_alpha&category=32&lettre="+ start_letter + "&cstart=" + current)
    
    result = driver.js_cmd(open("tmp/consts.js").read() + "\n" + open("scrap_cmd/for_tirexo/tirexo/search_alpha_v2.js").read())


driver.quit()