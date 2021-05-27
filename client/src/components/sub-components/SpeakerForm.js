import React, { useContext, useState } from 'react'
import AppContext from '../../context/app';

export default function SpeakerForm() {
    const [name, setName] = useState("")
    const [title, setTitle] = useState("")
    const {emitterFunc} = useContext(AppContext);

    var start = (e) => {
        e.preventDefault();
        emitterFunc("start", {name, title})
    }

    return (
        <form onSubmit={start}>
            <label>Full Name</label>
            <input 
                className="form-control"
                placeholder="Enter username"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <label>Presentation Title</label>
            <input 
                className="form-control"
                placeholder="Enter presentation title"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <button className="btn btn-primary">Join</button>
        </form>
    )
}
