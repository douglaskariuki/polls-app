import React, { useEffect, useState } from 'react'

export default function Ask({question, emitterFunc}) {
    const [choices, setChoices] = useState([]);
    const [answer, setAnswer] = useState(undefined)

    const setUpChoices = () => {
        var choiceKeys = Object.keys(question); //create array of object keys
        choiceKeys.shift(); // remove first item q "question"
        setChoices(choiceKeys);
    }

    useEffect(() => {
        setUpChoices()
    })

    const selectChoice = (choice) => {
        setAnswer(choice);
        localStorage.setItem("answer", choice);
        emitterFunc("answer", {question, choice})
    }

    const addChoiceButton = (choice, i) => {
        return (
            <button key={i}
                    onClick={() => selectChoice(choice)}>
                {choice}: {question[choice]}
            </button>
        )
    } 

    if (answer === undefined) {
        return (
            <div>
                <h2>{question.q}</h2>
                <div>
                    {choices.map(addChoiceButton)}
                </div>
            </div>
        )
    }

    return (
        <div>
            <h3>You answered: {answer}</h3>
            <p>{question[answer]}</p>
        </div>
    )
}
