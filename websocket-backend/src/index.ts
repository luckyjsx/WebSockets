import {WebSocketServer} from 'ws';
const wss = new WebSocketServer({port: 8080});

//event handler
wss.on("connection",function(socket){

    socket.on("message",function(message){
        if(message.toString() === "ping"){
            socket.send("pong")
        }
    });
})