import React, { useEffect, useState } from 'react'

import ListEpisodes from './ListEpisodes'
import Seasons from './Seasons'

import '../../../../css/serie.css'

import { APISerie } from '../../../interfaces/APISerie'
import { api_key, url } from '../../../utils/imdb'
import { APIEpisode } from '../../../interfaces/APIEpisode'




const Serie = ({ serie }: { serie: APISerie }): JSX.Element => {
    const [ episodes, setEpisodes ] = useState<JSX.Element>(<div></div>)

    useEffect(() => {
        fetch(url + "SeasonEpisodes/" + api_key + "/" + serie.id + "/" + serie.tvSeriesInfo.seasons[0])
            .then((response: Response) => response.json())
            .then((json: { episodes: Array<APIEpisode>}) => {
                setEpisodes(<ListEpisodes episodes={ json.episodes } serie={ serie } />)
            })

    }, [ serie ])

    return (
        <div>
            <Seasons serie={ serie } setEpisodes={ setEpisodes } />
            { episodes }
        </div>
    )
}

export default Serie