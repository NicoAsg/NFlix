let titles = document.getElementsByTagName("tbody")[0].getElementsByTagName("tr")

let search = () => {
    let actual_title
    console.log("title : " + title)
    for(let i = 0; i < titles.length; i++) {
        actual_title = titles[i].getElementsByTagName("td")[0]
        console.log("actual_title : " + actual_title.innerText.split("\t")[0].trim())
        if(actual_title.innerText.split("\t")[0].trim().includes(title) || title.includes(actual_title.innerText.split("\t")[0].trim()))
            return actual_title.getElementsByTagName("a")[0]
    }
    return null
}

let result = search()

if (result == null){
    let last_title = titles[titles.length - 1].innerText.split("\t")[0]
    let length = last_title.length < title.length ? last_title.length : title.length
    for(let i = 1; i < length; i++)
        if (title[i].toLocaleLowerCase() > last_title[i].toLocaleLowerCase())
            return "+"
        else if (title[i].toLocaleLowerCase() < last_title[i].toLocaleLowerCase())
            break

    let first_title = titles[0].innerText.split("\t")[0]
    length = first_title.length < title.length ? first_title.length : title.length
    for(let i = 1; i < length; i++)
        if (title[i].toLocaleLowerCase() < first_title[i].toLocaleLowerCase())
            return "-"
    return "="
}
else if (result != null) {
    result.click()
    return "ok"
}
else
    throw new Error("Content not found")
