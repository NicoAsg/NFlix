// Select quality and lang
const lang = ["MULTI", "VOSTFR", "French"]
const quality = ["Blu-Ray 1080p", "HDLight 1080p", "WEB-DL 1080p", "BDRIP", "Blu-Ray 720p", "HDLight 720p", "WEB-DL 720p", "DVDRIP"]


let select_quality = document.getElementsByName("qualite")[0]
let quality_options = Array.from(select_quality.options)

let best_lang = []
for(let i = 0; i < lang.length; i++) {
    quality_options.forEach((option) => {
        if (option.innerText.includes(lang[i]))
            best_lang.push(option)
    })
    if (best_lang.length) break
}
if(!best_lang.length)
    throw new Error("Lang not found")
console.log(best_lang)

let get_quality = () => {
    let best_quality = []
    for(let i = 0; i < quality.length; i++) {
        best_lang.forEach((option) => {
            if(option.innerText.includes(quality[i]))
                best_quality.push(option)
        })
        if(best_quality.length) break
    }
    if(!best_quality.length)
        throw new Error("Quality not found")
    console.log(best_quality)
    return best_quality
}
let best_quality = get_quality()


let check_episode = () => {
    // Check if the episode is available in this quality and lang
    let actual_quality = best_quality[0].innerText
    let n = actual_quality.search("/")     // Get the index of '/' in '(XX/XX)'
    let ep_available = parseInt((() => {     
        let ep_nb = ""
        let i = n
        while(actual_quality[i] != "(")
            i--
        for(i++; i < n; i++)      // Gets the number of episodes availables '(|XX|/XX)'
            ep_nb += actual_quality[i]
        return ep_nb
    })())

    if(episode < ep_available)
        return
    
    best_lang.splice(best_lang.indexOf(best_quality[0]), 1)

    best_quality = get_quality()
    check_episode()
}
if(episode != undefined)
    check_episode()

select_quality.selectedIndex = quality_options.indexOf(best_quality[0])
select_quality.dispatchEvent(new Event("change"))