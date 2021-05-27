import React from 'react'

export default function Display({connected, children}) {
    return (connected) ? <div>{children}</div> : null
}
