import React from 'react'
import { Watching } from '../../interfaces/Watching'

const SerieInfos = ({ media }: { media: Watching }): JSX.Element => {
    if (media.type === "TVSeries")
        return <p>Season { media.season } - Episode { media.episode }</p>
    else
        return <p></p>
}

export default SerieInfos