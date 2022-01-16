import React, { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import Serie from "./Serie/Serie"
import Movie from "./Movie"
import "../../../css/media.css"
import { APIMedia } from "../../interfaces/APIMedia"


const Media = (): JSX.Element => {
    const location = useLocation()

    const media = location.state as APIMedia

    if(!media) window.location.href = "/"
    document.title = media.title

    if (media.wikipedia.titleInLanguage) {
        let splittedTitle = media.title.split(" ")
        media.wikipedia.titleInLanguage.endsWith(splittedTitle[splittedTitle.length - 1])
        media.title = media.wikipedia.titleInLanguage
    }
    
    const [content, setContent] = useState<JSX.Element>(<div></div>)
    useEffect(() => {
        const seasons = media.tvSeriesInfo ? media.tvSeriesInfo.seasons : []
        if(media.type === "TVSeries" && seasons !== [])
            setContent(<Serie serie={ media } />)
        else
            setContent(<Movie movie={ media } />)
    }, [ media, setContent ])

    return (
        <div id="media">
            <div id="trailer">
                <iframe
                    src={ media.trailer.linkEmbed }
                    title="trailer"
                    allowFullScreen
                ></iframe>
            </div>
            <div id="title_bg">
                <div id="title">
                    <img src={ media.image } alt="poster" />
                    <div id="title_infos">
                        <h1>{ media.title }</h1>
                        <p id="year">{ media.year }</p>
                        <div id="plot">
                            <p>{ media.plot }</p>
                        </div>
                    </div>
                </div>
            </div>
            { content }
        </div>
    )
}

export default Media