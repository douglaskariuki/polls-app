import React, { useContext } from 'react';
import AppContext from '../context/app';
import Display from './sub-components/Display';
import SpeakerForm from "./sub-components/SpeakerForm";
import Attendance from './sub-components/Attendance';
import Questions from './sub-components/Questions';

export default function Speaker() {
    const {audience, member, status, questions} = useContext(AppContext);
    if (member) {
        if (member.name && member.type === "speaker") {
            var connectedView = ( 
                <div>
                    <div>
                        <Questions questions={questions}/>
                        <Attendance audience={audience}/>
                    </div> 
                </div> 
            )

            return (
                <div>
                    <h1>Speaker {member.name}</h1>
                    <Display connected={status === "connected"}>
                        {connectedView}
                    </Display>
                </div>
            )
        }
    }



    return (
        <div>
            <Display connected={status === "connected"}>
                <SpeakerForm />
            </Display>
        </div>
    )
}
