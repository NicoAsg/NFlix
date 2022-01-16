import React from 'react'
import { useNavigate } from 'react-router-dom'
import { APIMedia } from '../../interfaces/APIMedia'
import { APIResult } from '../../interfaces/APIResult'
import { api_key, url } from '../../utils/imdb'

const Result = ({ result }: { result: APIResult } ): JSX.Element => {
    const navigate = useNavigate()

    const goMedia = (id: string, title: string): void => {
        if (!id) return

        const options = "Trailer,Wikipedia"

        fetch(url + "Title/"
                + api_key + "/" + id + "/" + options)
            .then((response: any) => response.json()
                .then((json: APIMedia) => {
                    json.title = title
                    navigate("/media", { state: json })
                }))
                
    }

    return (
        <div className="item" id={ result.id } onClick={ () => goMedia(result.id, result.title) }>
            <div>
                <img className="titleImage" src={ result.image } alt="" />
            </div>
            <div className="titleDetails">
                <span>{ result.title }</span>
                <span>{ result.description }</span>
            </div>
        </div>
    )
}

export default Result