import React from "react"
import { useNavigate } from "react-router-dom"
import "../../../css/movie.css"
import { APIMedia } from "../../interfaces/APIMedia"

const Movie = ({ movie }: { movie: APIMedia }): JSX.Element => {
    const navigate = useNavigate()
    return (
        <div>
            <button id="watch_button" onClick={ () => navigate("/watch", { state: movie }) }>Watch</button>
        </div>
    )
}

export default Movie