let pages = document.getElementsByClassName("pagination")[0].getElementsByTagName("li")
let pages_nb = parseInt(pages[pages.length - 2].innerText)

let search = () => {
    let titles = document.getElementsByTagName("tbody")[0].getElementsByTagName("tr")
    let actual_title
    for(let i = 0; i < titles.length; i++) {
        actual_title = titles[i].getElementsByTagName("td")[0]
        if(actual_title.innerText.trim().includes(title) || title.includes(actual_title.innerText.trim()))
            return actual_title.getElementsByTagName("a")[0]
    }
    return null
}

let result = search()

if (result == null && !pages[pages.length - 2].classList.contains("active")){
    pages[pages.length - 1].getElementsByTagName("a")[0].click()
    return "switch"
}
else if (result != null)
    result.click()
else
    throw new Error("Content not found")
