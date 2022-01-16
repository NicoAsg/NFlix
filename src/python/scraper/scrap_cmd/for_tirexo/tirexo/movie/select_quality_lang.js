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

select_quality.selectedIndex = quality_options.indexOf(best_quality[0])
select_quality.dispatchEvent(new Event("change"))