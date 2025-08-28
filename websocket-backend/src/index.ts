import {WebSocketServer,WebSocket} from 'ws';
const wss = new WebSocketServer({port: 8080});

interface User {
    socket: WebSocket;
    room: string;
}
let allSockets: User[] = [];
//event handler
wss.on("connection",function(socket){
    socket.on("message",(message) =>{
        const parsedMessage = JSON.parse(message as unknown as  string);
        if(parsedMessage.type === "join"){
            console.log("user joined room: ", parsedMessage.payload.roomId);
            allSockets.push({
                socket,
                room: parsedMessage.payload.roomId,
            })
        }

        if(parsedMessage.type === "chat"){
            console.log("user sent message: ", parsedMessage.payload.message);
            const currentUserRoom = allSockets.find(x => x.socket === socket)?.room;
            allSockets.forEach(user => {
                if(user.room === currentUserRoom){
                    user.socket.send(parsedMessage.payload.message)
                }
            })
        }


    });

    // socket.on("disconnect",()=>{
    //     allSockets = allSockets.filter(s => s !== socket)
    // })
}) 