import React from 'react'
import { useNavigate } from 'react-router-dom'
import { APIResult } from '../../interfaces/APIResult'
import '../../../css/header.css'
import Logo from './Logo'
import Search from './Search'
import { api_key, url } from '../../utils/imdb'

function Header(): JSX.Element {
    let navigate = useNavigate()
    let searching = false

    const fetchResults = (): void => {
        let search = document.getElementById("search")?.getElementsByTagName("input")[0]?.value        
        if (!search || searching) return

        searching = true

        fetch(url + "SearchTitle/"
                + api_key + "/" + encodeURIComponent(search))
            .then((response: Response) => response.json()
            .then((json: { results: Array<APIResult> }) => {
                searching = false
                navigate("/search", { state: json.results })
            }))
    }

    return (
        <header>
            <Logo />
            <Search fetchResults={ fetchResults } />
        </header>
    )
}

export default Header