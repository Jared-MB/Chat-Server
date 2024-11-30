import { Module } from '@nestjs/common';
import { ChatModule } from './modules/chat/chat.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    ChatModule,
  ],
})
export class AppModule { }
