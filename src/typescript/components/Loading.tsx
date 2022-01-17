import React from 'react'
import "../../css/loading.css"

const Loading = (): JSX.Element => {
    return(
        <div id="loading">
            <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
        </div>
    )
}

export default Loading