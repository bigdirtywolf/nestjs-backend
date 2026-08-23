import { Body, Controller, Post } from "@nestjs/common";
import { WebSocketDTO } from "src/dto/WebSocketDTO";
import { WebSocketService } from "src/service/WebSocketService";

@Controller('ws')
export class WebSocketController {
    constructor(
        private readonly webSocketService: WebSocketService,
    ) {}

    @Post('create')
    createWebSocket(@Body() webSocketDTO: WebSocketDTO) {
        return this.webSocketService.createWebSocket(webSocketDTO)
    }
}