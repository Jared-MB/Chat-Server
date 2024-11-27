import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  }
})
export class ChatGateway {

  @WebSocketServer()
  server: Server;

  messages: string[] = [];

  @SubscribeMessage('message')
  handleMessage(@MessageBody() body: string, @ConnectedSocket() client: Socket) {
    this.messages.push(body);

    this.server.emit('message', this.messages, client.id);
  }
}
