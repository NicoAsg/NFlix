driver.load("https://www2.tirexo.work/?do=index_alpha&category=" + category + "&lettre=" + start_letter)



max = str(driver.js_cmd(open("scrap_cmd/for_tirexo/tirexo/get_max.js").read()))
min = str(1)
current = str(int(int(max) / 2))

open("scrap_cmd/for_tirexo/tirexo/tmp/boundaries.js", "w+").write("const min = " + min + "\n" + "const max = " + max + "\n" + "const current_page = " + current)

driver.load("https://www2.tirexo.work/?do=index_alpha&category=" + category + "&lettre="+ start_letter + "&cstart=" + current)

result = driver.js_cmd(open("tmp/consts.js").read() + "\n" + open("scrap_cmd/for_tirexo/tirexo/tmp/boundaries.js").read() + "\n" + open("scrap_cmd/for_tirexo/tirexo/search_alpha.js").read())

while True:
    print(min + " " + max + " " + current + " " + result)
    if result == "ok" or result == "=":
        break

    if result == "+":
        if min == current:
            print("Error")
            break
        min = current
        current = str(int((int(max) - int(min)) / 2) + int(min))
    elif result == "-":
        if max == current:
            print("Error")
            break
        max = current
        current = str(int((int(max) - int(min)) / 2) + int(min))
    else:
        print("Error")
        break
    
    open("scrap_cmd/for_tirexo/tirexo/tmp/boundaries.js", "w").write("const min = " + min + "\n" + "const max = " + max + "\n" + "const current_page = " + current)

    driver.load("https://www2.tirexo.work/?do=index_alpha&category=" + category + "&lettre="+ start_letter + "&cstart=" + current)
    
    result = driver.js_cmd(open("tmp/consts.js").read() + "\n" + open("scrap_cmd/for_tirexo/tirexo/search_alpha.js").read())