import { IsNumber, IsString } from "class-validator";
import { Socket } from "socket.io";

export class WebSocketDTO {
    @IsNumber()
    port: number

    @IsString()
    origin: string = '*'

    connectHandler: (client: Socket) => void = (client: Socket) => { console.log('connected', client) }

    disconnectHandler: (client: Socket) => void = (client: Socket) => { console.log('disconnected', client) }

    receivers: Map<string, (client: Socket, payload: any) => void> = new Map([
        ['receiver1', (client: Socket, payload: any) => { console.log('receiver1', client, payload)}],
        ['receiver2', (client: Socket, payload: any) => { console.log('receiver2', client, payload)}],
    ])
}