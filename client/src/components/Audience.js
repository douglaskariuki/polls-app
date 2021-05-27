import React, { useContext } from 'react'
import App from '../App'
import AppContext from '../context/app'
import Ask from './sub-components/Ask';
import Display from './sub-components/Display'
import Join from './sub-components/Join';

export default function Audience(props) {
    const {status, name, audience, currentQuestion, emitterFunc} = useContext(AppContext)

    const alreadyJoined = (
        <div>
            <h2>Welcome {name}</h2>
            <p>{audience.length} members connected</p>
            <p>Questions will appear here</p>
            {(currentQuestion) ? <Ask emitterFunc={emitterFunc} question={currentQuestion}/> : null }
        </div>
    )
    return ( 
        <div>
            <Display connected={status === "connected"}>
                {(name === "") ? <Join /> : alreadyJoined}
            </Display>
        </div>
    )
}

