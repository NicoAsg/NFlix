import React from 'react'
import { useLocation} from 'react-router-dom'
import "../../../css/results.css"
import { APIResult } from '../../interfaces/APIResult'
import Result from './Result'


const SearchResults = (): JSX.Element => {
    const location = useLocation()

    const results = location.state as Array<APIResult>
    if(!results) window.location.href = "/"
    document.title = "Search"
    
    return (
        <div id="results">
            { results.map((result) => <Result result={ result } key={ result.id }/> ) }
        </div>
    )
}

export default SearchResults