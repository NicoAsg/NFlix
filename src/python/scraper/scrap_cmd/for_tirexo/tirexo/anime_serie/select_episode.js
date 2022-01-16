// Select episode
let links = document.getElementsByClassName("table-responsive")[0]

if(episode == undefined) {
    links.getElementsByTagName("tbody")[0].getElementsByTagName("tr")[0].getElementsByTagName("a")[0].click()
    return
}

// Show more rows
let rows_select = links.getElementsByTagName("select")[0]
let show_100_rows = () => {
    rows_select.selectedIndex = 3
    rows_select.dispatchEvent(new Event("change"))
}
show_100_rows()


let get_ep_list = () => links.getElementsByTagName("tbody")[0].getElementsByTagName("tr")
let ep_list = get_ep_list()

// May change page
let last_ep = () => {
    let result = ep_list[ep_list.length - 1].getElementsByTagName("td")[0].innerText.trim()
    if (result.includes("\\n"))
        result = result.split("\\n")[0].trim()
    result = result.split(" ")
    return result[result.length - 1]
}

let pages = links.getElementsByClassName("pagination")[0].getElementsByTagName("li")
let last_page = Array.from(pages).length - 2      // (-2) for 'Previous' and 'Next'
let actual_page = 1
if(episode > last_ep())
    while(actual_page < last_page) {
        actual_page++
        pages[actual_page].click()

        ep_list = get_ep_list()
        if(episode < last_ep())
            break
    }


let find_episode = () => {
    let ep_list_arr = Array.from(ep_list)
    let a
    for(let i = 0; i < ep_list_arr.length; i++) {
        a = ep_list[i].getElementsByTagName("a")[0]
        if(a.innerText.trim() == "Episode " + episode)
            return a
    }
    return null
}
ep_link = find_episode()
if(ep_link == null)
    throw new Error("Episode not found")
ep_link.click()