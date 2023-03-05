import { OnModuleInit } from "@nestjs/common";
import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server } from "socket.io";

@WebSocketGateway()
export class ChatGateway implements OnModuleInit{
    
    @WebSocketServer() // This is the socket.io server
    server: Server; 
    
    onModuleInit() { // This is called when the module is initialized (on server start) on the same PORT as the REST API
        this.server.on('connection', (socket) => {
            console.log('New client connected on ID: '+ socket.id); // This is called when a client connects to the socket.io server
            socket.on('disconnect', () => { // This is called when a client disconnects from the socket.io server
                console.log('Client disconnected');
            });
        })
        console.log('ChatGateway initialized');
    }

    
    @SubscribeMessage('newMessage') // This is called when a client sends a message to the socket.io server
    onNewMessage(@MessageBody() body: string) { 
        console.log('New message: '+ body);
        this.server.emit('onMessage', { // This is called when the server sends a message to all clients
            subject: 'New message',
            message: body,
        });
    }
}