import React, { useContext } from "react"
import App from "../../App"
import AppContext from "../../context/app"

export default function Questions({questions}) {
    const { emitterFunc } = useContext(AppContext)

    const ask = (question) => {
        emitterFunc("ask", question)
    }

    const addQuestion = (question, i) => {
        return (
            <div key={i}>
                <span onClick={() => ask(question)}>{question.q}</span>
            </div>
        )
    } 

    if(questions.length) {
        return (
            <div>
                <h2>Questions</h2>
                {questions.map(addQuestion)}
            </div>
        )
    }

    return (
        <p>No questions</p>
    )
}