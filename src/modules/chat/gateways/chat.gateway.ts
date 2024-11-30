import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

import { MessageRepository } from '../repositories/message.repository';
import { UserRepository } from '../repositories/user.repository';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway implements OnGatewayDisconnect {

  private connectedUsers = new Map<string, string>();

  @WebSocketServer()
  server: Server;

  constructor(
    private readonly messageRepository: MessageRepository,
    private readonly userRepository: UserRepository,
  ) { }

  handleDisconnect(socket: Socket) {
    this.connectedUsers.delete(socket.id);
    this.server.emit('users', { users: this.countUsers() });
  }

  private countUsers() {
    const users: string[] = []
    for (const values of this.connectedUsers.values()) {
      users.push(values)
    }
    return users
  }

  @SubscribeMessage('join')
  async handleJoin(@MessageBody() body: { userId: string }, @ConnectedSocket() socket: Socket) {
    const messages = await this.messageRepository.findAllByUser(body.userId);
    const user = (await this.userRepository.findById(body.userId))[0];
    this.connectedUsers.set(socket.id, body.userId);
    socket.emit('join', { user, messages });
  }

  @SubscribeMessage('users')
  async handleUsers() {
    const users = this.countUsers()
    this.server.emit('users', { users });
  }

  @SubscribeMessage('message')
  async handleMessage(@MessageBody() body: { username: string, message: string, userId: string }) {

    const users = await this.userRepository.findById(body.userId);
    let user;

    if (users.length === 0) {
      user = (await this.userRepository.create({ username: body.username, name: body.username }))[0];
    }
    else {
      user = users[0]
    }

    const message = await this.messageRepository.create({ text: body.message, ownerId: user.id, receptorId: user.id });

    this.server.emit('message', message);
  }
}
