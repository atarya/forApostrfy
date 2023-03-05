import { Module } from '@nestjs/common';
import { ChatGateway } from './chat-gateway.service';

@Module({
    imports: [],
    controllers: [],
    providers: [ChatGateway], // This is the service that will be initialized when the module is initialized
    exports: [],
})
export class ChatGatewayModule {}
