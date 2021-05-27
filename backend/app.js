const express = require("express");
const _ = require("underscore");
const app = express();
const server = require("http").createServer(app);
const cors = require("cors");
// const mongoose = require("mongoose");
const { Server } = require("socket.io");
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        credentials: true
    },
});
var questions = require('../questions.js')
console.log(`First Question, ${questions[0].q}`)

var connections = [];
var title = "Untitled presentation";
var audience = [];
var speaker = {};
var currentQuestion = false;
var results = {
    a: 0,
    b: 0,
    c: 0
}


io.on("connection", (socket) => {
    socketId = socket.id;

    connections.push(socket)
    console.log(`User Connected, ${socketId}.
    Total sockets, ${connections.length}
    `)
 
    // send message to client after they connect
    socket.emit("message", { user: 'hello from server' })

    // receive msg from client
    socket.on("frm client", (data) => {
        console.log(data.client)
    })

    // join new client
    socket.on("join", (payload) => {

        var newMember = {
            id: socketId,
            name: payload.name,
            type: 'member'
        }

        // respond to client by sending the member
        socket.emit("joined", newMember)

        audience.push(newMember);
        // broadcast to every connected socket
        io.sockets.emit('audience', audience);

        console.log(`New member, ${payload.name}, ID, ${socketId}`)
    })

    socket.on("start", (payload) => {
        title = payload.title;

        speaker.id = socketId;
        speaker.name = payload.name;
        speaker.type = 'speaker';
        socket.emit("joined", speaker);

        io.sockets.emit("started", { title, speaker: speaker.name });
        console.log(`Presentation started, 
            title ${title}, by ${speaker.name} `)
    })

    socket.on("ask", (question) => {
        currentQuestion = question;
        results = {a:0, b:0, c:0}
        io.sockets.emit("asked", currentQuestion);
        console.log(`Question asked, ${question.q}`)
    })

    socket.on("answer", (payload) => {
        results[payload.choice]++;
        io.sockets.emit("results", results)
        console.log(`Answer - ${payload.choice}, ${results}`)
    })

    socket.emit("welcome", {
        title,
        audience,
        speaker: speaker.name,
        questions,
        currentQuestion,
        results
    })

    // handle disconnects
    socket.on("disconnect", () => {
        var member = _.findWhere(audience, {id: socketId});
        if(member){
            audience.splice(audience.indexOf(member), 1);
            io.sockets.emit("audience", audience)
            console.log(`${member.name} Left, ${audience.length} members remaining`)
        } else if (socketId === speaker.id) {
            console.log(`Speaker ${speaker.name} Left, Presentation ${title} is over`);

            speaker = {};
            title = "Untitled presentation";
            
            io.sockets.emit("end", { title, speaker: "" });
        }

        connections.splice(connections.indexOf(socket), 1)
        console.log(`User disconnected.
        Sockets remaining, ${connections.length}
        `)
    })
})

server.listen(8080, () => {
    console.log('listening on 8080');
});