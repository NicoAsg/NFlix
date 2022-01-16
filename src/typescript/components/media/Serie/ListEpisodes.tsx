import React from 'react'
import { useNavigate } from 'react-router-dom'
import { APIEpisode } from '../../../interfaces/APIEpisode'
import { APISerie } from '../../../interfaces/APISerie'
import { Watching } from '../../../interfaces/Watching'

const ListEpisodes = ( { episodes, serie }: { episodes: Array<APIEpisode>, serie: APISerie } ): JSX.Element => {
    const navigate = useNavigate()

    const goWatch = (episode: APIEpisode): void => {
        const toWatch: Watching = {
            title: serie.title,
            type: serie.type,
            genres: serie.genres,

            season: episodes[0].seasonNumber,
            episode: episode.episodeNumber,
            totalEpisodes: episodes.length.toString()
        }
        navigate("/watch", { state: toWatch })
    }

    return (
        <div id="episodes">
            {
            episodes.map((episode: APIEpisode): JSX.Element => {
                return (
                    <div className="episode" id={ episode.id } key={ episode.id } onClick={ () => goWatch(episode) }>
                        <div className="img">
                            <div>
                                <img src={ episode.image} alt="" />
                            </div>
                        </div>
                        <div>
                            <h2>{ episode.title }</h2>
                            <p className="episode_nb" id={ episode.episodeNumber }>Episode { episode.episodeNumber }</p>
                            <p>{ episode.plot }</p>
                        </div>
                    </div>
                )
            }) 
            }
        </div>
    )
}

export default ListEpisodes