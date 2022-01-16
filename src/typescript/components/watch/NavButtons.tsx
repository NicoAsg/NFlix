import React from 'react'
import { Watching } from '../../interfaces/Watching'

const NavButtons = ({ media, goNextEpisode, goPreviousEpisode }: { media: Watching, goNextEpisode: () => void, goPreviousEpisode: () => void }): JSX.Element => {
    if (media.type === "TVSeries")
        if (media.episode === "1")
            return (
                <div id="nav_buttons">
                    <button id="previousEpisode" disabled>Previous</button>
                    <button id="nextEpisode" onClick={() => goNextEpisode() }>Next</button>
                </div>
            )
        else if (media.episode === media.totalEpisodes)
            return (
                <div id="nav_buttons">
                    <button id="previousEpisode" onClick={() => goPreviousEpisode() }>Previous</button>
                    <button id="nextEpisode" disabled>Next</button>
                </div>
            )
        else
            return (
                <div id="nav_buttons">
                    <button id="previousEpisode" onClick={() => goPreviousEpisode() }>Previous</button>
                    <button id="nextEpisode" onClick={() => goNextEpisode() }>Next</button>
                </div>
            )
    else
        return (<div></div>)
}

export default NavButtons