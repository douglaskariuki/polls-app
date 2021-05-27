import React, { useContext, useState } from 'react'
import AppContext from '../../context/app';

export default function Join() {
    const [name, setName] = useState("");
    const {emitterFunc} = useContext(AppContext);

    const join = (e) => {
        e.preventDefault();
        emitterFunc("join", { name });
    }

    return (
        <form onSubmit={join}>
            <label>Full Name</label>
            <input 
                className="form-control"
                placeholder="Enter username"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <button className="btn btn-primary">Join</button>
        </form>
    )
}
