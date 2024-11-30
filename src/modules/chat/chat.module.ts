import { Module } from '@nestjs/common';
import { ChatGateway } from './gateways/chat.gateway';
import { UserRepository } from './repositories/user.repository';
import { MessageRepository } from './repositories/message.repository';

@Module({
  providers: [ChatGateway, UserRepository, MessageRepository],
})
export class ChatModule { }
