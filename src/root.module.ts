import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ChatGatewayModule } from './chat-gateway/chat-gateway.module';

@Module({
  imports: [ConfigModule.forRoot( // Provides access to the .env file
    {
      isGlobal: true,
      envFilePath: '.env',
    }
  ), 
    MongooseModule.forRootAsync({ // Initializes the connection to the Mongo DB database (here; Atlas)
    useFactory: () => ({
      uri: process.env.MONGO_URI,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })}), UsersModule, AuthModule, ChatGatewayModule],
  
  controllers: [],
  providers: [],
  exports: [],
})
export class RootModule {
    constructor() {
      let indicate = () =>  console.log('\nRootModule instantiated\n')
      indicate(); // Signals that the server is ready to accept requests
    };
}
