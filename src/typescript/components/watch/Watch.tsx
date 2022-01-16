import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import '../../../css/watch.css'
import { Watching } from '../../interfaces/Watching'
import { APIBody } from '../../interfaces/APIBody'
import SerieInfos from './SerieInfos'
import NavButtons from './NavButtons'
import { url } from '../../utils/scraper'

const Watch = (): JSX.Element => {
    const location = useLocation()

    const media = location.state as Watching
    if(!media) window.location.href = "/"
    document.title = "Watch " + media.title

    media.genres = media.genres.split(",")[0]

    const fetchVideo = (body: APIBody): void => {
        fetch(url, { 
            mode: "cors", 
            method: "POST",
            redirect: "follow",
            headers: { "Accept": "application/json", "Content-Type": "application/json" },
            body: JSON.stringify(body)
        }).then((response) => response.json())
            .then((json : { video: string }) => document.getElementsByClassName("video")[0].innerHTML = json.video)
            .catch((err) => console.log(err))
    }

    useEffect(() => {
        if(document.getElementsByClassName("video")[0].innerHTML !== "") return
        if (media.type === "TVSeries" && media.season && media.episode) {
            if(media.genres === "Animation")
                /// Scrap Anime w/ season and episode
                fetchVideo({
                    type: "Anime",
                    title: media.title,
                    season: media.season,
                    episode: media.episode
                })
            else
                /// Scrap Serie
                fetchVideo({
                    type: "Serie",
                    title: media.title,
                    season: media.season,
                    episode: media.episode
                })
        }
        else if (media.type === "Movie") {
            if(media.genres === "Animation")
                fetchVideo({
                    type: "Anime",
                    title: media.title,
                    season: "0",
                    episode: "0"
                })
            else
                /// Scrap Movie
                fetchVideo({
                    type: "Movie",
                    title: media.title,
                    season: "0",
                    episode: "0"
                })
        }
        else
            console.log("Error with the media")
    }, [media])

    const goPreviousEpisode = (): void => {
        if (!media.episode) return
        const previousEpisode = parseInt(media.episode) - 1
        if (previousEpisode < 1) return

        media.episode = previousEpisode.toString()
        
        if (media.genres === "Animation")
            fetchVideo({
                type: "Anime",
                title: media.title,
                season: media.season,
                episode: media.episode
            })
        else
            fetchVideo({
                type: "Serie",
                title: media.title,
                season: media.season,
                episode: media.episode
            })
        
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        setNavButtons(<NavButtons media={ media } goNextEpisode= { goNextEpisode } goPreviousEpisode={ goPreviousEpisode } />)
        setSerieInfos(<SerieInfos media={ media } />)
    }

    const goNextEpisode = (): void => {
        if (!media.episode || !media.totalEpisodes) return
        const nextEpisode = parseInt(media.episode) + 1
        if (nextEpisode > parseInt(media.totalEpisodes)) return

        media.episode = nextEpisode.toString()
        
        if (media.genres === "Animation")
            fetchVideo({
                type: "Anime",
                title: media.title,
                season: media.season,
                episode: media.episode
            })
        else
            fetchVideo({
                type: "Serie",
                title: media.title,
                season: media.season,
                episode: media.episode
            })
        
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        setNavButtons(<NavButtons media={ media } goNextEpisode= { goNextEpisode } goPreviousEpisode={ goPreviousEpisode } />)
        setSerieInfos(<SerieInfos media={ media }/>)
    }

    const [ navButtons, setNavButtons ] = useState<JSX.Element>(<NavButtons media={ media } goNextEpisode= { goNextEpisode } goPreviousEpisode={ goPreviousEpisode } />)
    const [ serieInfos, setSerieInfos ] = useState<JSX.Element>(<SerieInfos media={ media } />)

    return (
        <div>
            <img src="data:image; base64, iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAMAAACdt4HsAAAAA3NCSVQICAjb4U/gAAAACXBIWXMA
                AAQLAAAECwGQELNjAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAQVQTFRF
                ////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
                AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
                AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
                AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
                AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAmmABdAAAAFZ0Uk5TAAECAwQFBgsNEhMV
                FhccKywtMDQ3ODk7QkZKTVpfYmNpbG9wenx9gIGCg4SFhoeKi4yWnqCkq6ytrq+wsrO6u7y+wsPE
                zc7U2Nve4OHn6vHy9Pf4+/0FIGZZAAACcklEQVRYw62X2XoSQRCFK0QBhQRFDUZIAmIILgyExS0J
                iEE22Zf//R/FC0yATDfT83XqsqtOTXfNqU1EI6FktlhrdieTbrNWzCZD4ksip9cztmR2fRoxRQfT
                t0sUsvydDhrA91J9tNJP7Xnhj9v31uNOvVrIZArVemd8f9g+3gk/bNwZ9kqJwPo8kCj17jSNQz3+
                aLiyGeVibmUsN1pph0c6/MkcgGk+rNaH81MA5idK9f4lAIvygf6KB+UFAJf7CvwVAIP47iDHBwBc
                uT2svt+Kev2maGt1B9f7AagYMCVYAeBBHI7mAOdmVD0HmG/9i8MhQMWU7BWA4SYfGgCtoHG2tAAa
                G/wFGETNszU6ALhn9V4bWMT95Ht8AbTvMisFUFaYPXut9VAGSP1/UR+YKvj3YcaffR0np0B/FbU0
                QN5tcwHwTneFPEBaRERugVFYbcFLnYPwCLgVEYksgZzL4CMAX/VxzAHLiIicAcTU+KunegcxgDMR
                uQF6D7WfPPEiPeBGJDQDSg90nwH4uRMvJWAWkiRAQoX/sRsvCYCkZIFxYEvzBYDvHngJjIGsFIGO
                Cv/Ek88doCg1oL55XADgmzde6kBNmkB149RZ9Y9XcaW82HxsFWhKFyisD9+zW/6+3b5rVyZAZh2Y
                gYcDfq0dZICJvQPrJ1gH0fUbHZ+/0U0kxx+RFFR2fFFZlUyOn2RSprPjI53VBcUxLyiakuaYlzRN
                UXWMi6qurDumZV3bWBzTxqJtbRdzs9amb67P3xg1V/v2bj1g2I849kOW9ZhnP2jaj7r2w7b1uG+/
                cDzCymO/dNmvfY+weNqvvo+wfPtb//8BdadwiChSsboAAAAASUVORK5CYII=" alt="Back Button" id='back_button' onClick={ () => window.history.back() } />
            <div>
                <div id="infos">
                    <h1>{ media.title }</h1>
                    { serieInfos }
                </div>
                <div className="video"></div>
            </div>
            { navButtons }
        </div>
    )
}

export default Watch