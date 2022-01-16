// Select season if possible
let select_season = document.getElementById("saison")

if(select_season != null) {
    let season_options = Array.from(select_season.options)
    let ok = false
    season_options.forEach((option, index) => {
        if(option.innerText.trim() == "Saison " + season) {
            select_season.selectedIndex = index
            select_season.dispatchEvent(new Event("change"))
            ok = true
        }
    })
    if(!ok)
        throw new Error("Season not found")
} 