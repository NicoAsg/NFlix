import React, { KeyboardEvent } from 'react'

const Search = ({ fetchResults }: { fetchResults: () => void }):JSX.Element => {
    const enterSearch = (event: KeyboardEvent<HTMLElement>): void => {
        if (event.key !== "Enter") return
        fetchResults()
    }

    return (
        <div>
            <div id="search">
                <input type="text" onKeyPress={ enterSearch } placeholder='Search' />
                <span className="input_border"></span>
                <img onClick={ fetchResults } src="data:image; base64, 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" alt="Search" />
            </div>
        </div>
    )
}

export default Search