result = driver.js_cmd(open("tmp/consts.js").read() + "\n" + open("scrap_cmd/for_tirexo/tirexo/search_alpha.js").read())

while result == "switch":
    driver.wait_js("document.getElementsByClassName('pagination')[0] != undefined")
    result = driver.js_cmd(open("tmp/consts.js").read() + "\n" + open("scrap_cmd/for_tirexo/tirexo/search_alpha.js").read())