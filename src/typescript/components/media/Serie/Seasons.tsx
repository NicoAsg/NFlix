import React, { useEffect, useState } from 'react'
import ListEpisodes from './ListEpisodes'
import { APISerie } from '../../../interfaces/APISerie'
import { APIEpisode } from '../../../interfaces/APIEpisode'
import { api_key, url } from '../../../utils/imdb'
import Loading from '../../Loading'

const Seasons = ({ serie, setEpisodes }: { serie: APISerie, setEpisodes: React.Dispatch<React.SetStateAction<JSX.Element>>}): JSX.Element => {
    const [ clickOnce, setClickOnce ] = useState<boolean>(false)

    const selectSeason = (season: HTMLDivElement): void => {
        const seasonList = document.getElementsByClassName("season") as HTMLCollectionOf<HTMLDivElement>
            setEpisodes(<Loading />)
        
            for (let i = 0; i < seasonList.length; i++) {
                seasonList[i].style.backgroundColor = ""
                seasonList[i].style.boxShadow = ""
            }

            season.style.backgroundColor = "rgb(0 0 0 /50%)"
            season.style.boxShadow = "0px 0px 3px 0px white"

            fetch(url + "SeasonEpisodes/" + api_key + "/" + serie.id + "/" + season.id)
                .then((response: Response) => response.json())
                .then((json: { episodes: Array<APIEpisode> }) => {
                    setEpisodes(<ListEpisodes episodes={ json.episodes } serie={ serie } />)
                })
    }

    useEffect(() => {
        if (!clickOnce) {
            const s1 = document.getElementsByClassName("season")[0] as HTMLDivElement
            s1.style.backgroundColor = "rgb(0 0 0 /50%)"
            s1.style.boxShadow = "0px 0px 3px 0px white"

            setClickOnce(true)
        }
    }, [ clickOnce, setClickOnce ])
    
    return (
        <div id="seasons">
            { 
            serie.tvSeriesInfo.seasons.map(season => 
                <div className='season' id={ season } key={ season } onClick={ (event) => selectSeason(event.target as HTMLDivElement) }>
                    Season { season }
                </div>
            )
            }
        </div>
    )
}

export default Seasons