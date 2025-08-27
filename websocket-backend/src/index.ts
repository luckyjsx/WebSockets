import {WebSocketServer,WebSocket} from 'ws';
const wss = new WebSocketServer({port: 8080});

interface User {
    socket: WebSocket;
    room: string;
}
let allSockets: User[] = [];
//event handler
wss.on("connection",function(socket){
    allSockets.push(socket);
    socket.on("message",function(message){
        const parsedMessage = JSON.parse(message);
        if(parsedMessage.type === "join"){
            allSockets.push({
                socket,
                room: parsedMessage.payload.roomId
            })
        }
    });

    socket.on("disconnect",()=>{
        allSockets = allSockets.filter(s => s !== socket)
    })
}) 