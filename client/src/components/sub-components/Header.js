import React, { useContext } from 'react'
import AppContext from '../../context/app'

export default function Header(props) {
    const {title, status, speaker} = useContext(AppContext)
    
    return (
        <header>
            <h1>{title}</h1><p>{ status}</p> 
            <h2>By {speaker}</h2>
        </header>
    )
}
