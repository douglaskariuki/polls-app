import React, { useState, useEffect } from "react";
import socketClient from "socket.io-client";
import Header from "./components/sub-components/Header";
import AppContext from "./context/app";
import RoutesHandler from "./RoutesHandler";
const ENDPOINT = "http://127.0.0.1:8080";
const socket = socketClient(ENDPOINT);

function App() {
  const [status, setStatus] = useState("disconnected")
  const [title, setTitle] = useState("")
  const [name, setName] = useState("")
  const [memberId, setMemberId] = useState("")
  const [member, setMember] = useState(JSON.parse(localStorage.getItem('member')))
  const [speaker, setSpeaker] = useState("")
  const [audience, setAudience] = useState([]);
  const [questions, setQuestions] = useState([])
  const [currentQuestion, setCurrentQuestion] = useState(false);
  const [results, setResults] = useState({})
  
   
  useEffect(() => {

    var isCurrent = true

    if (isCurrent) {
      socket.on('connect', () => {
        if(member && member.type === "member") {
          socket.emit("join", member);
        } else if (member && member.type === "speaker") {
          socket.emit("start", { name: member.name, title: localStorage.getItem("title") })
        }

        setStatus("connected")
      })

      socket.on("welcome", (data) => {
        setTitle(data.title) 
        setSpeaker(data.speaker)
        setAudience(data.audience)
        setQuestions(data.questions)
        setResults(data.results)
        console.log(`title: ${title}, by: ${speaker}`)
        console.log(`Question 1, ${data.questions[0].q}`)
      })

      socket.on("joined", (member) => {
        setName(member.name)
        setMemberId(member.id)
        setMember(member)
        localStorage.setItem('member', JSON.stringify(member));
      })

      socket.on("started", (data) => {
        if(member && member.type === "speaker") {
          localStorage.setItem("title", JSON.stringify(data.title))
        }
        setTitle(data.title)
        setSpeaker(data.speaker)
        console.log(`title: ${title}, by: ${speaker}`) 
      })

      socket.on("asked", (question) => {
        localStorage.removeItem("answer")
        setCurrentQuestion(question)
      })

      socket.on("results", (data) => {
        setResults(data)
      })

      socket.on("end", (data) => {
        setTitle(data.title);
        setSpeaker(data.speaker)
      })

      socket.on('audience', (newAudience) => {
        setAudience(newAudience);
      })

      socket.on("disconnect", () => {
        setStatus("disconnected")
        setTitle("disconnected")
        setSpeaker("")
      })
    }
    return () => {
      isCurrent = false
    }

  });

  const emitterFunc = (eventname, payload) => {
    socket.emit(eventname, payload)
  }

  return (
      <AppContext.Provider value ={{
        questions,
        status,
        title,
        emitterFunc,
        name,
        setName,
        memberId,
        setMemberId,
        member,
        speaker,
        audience,
        currentQuestion,
        results
      }}>
        <Header/>
        <RoutesHandler />
      </AppContext.Provider>
  );
}

export default App;