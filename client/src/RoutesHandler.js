import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Audience from './components/Audience'
import Board from './components/Board'
import Home from './components/Home'
import Speaker from './components/Speaker'

export default function RoutesHandler() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/audience" component={Audience} />
                <Route exact path="/board" component={Board} />
                <Route exact path="/speaker" component={Speaker} />
            </Switch>
        </BrowserRouter>
    )
}
