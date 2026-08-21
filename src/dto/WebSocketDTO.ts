import { IsNumber, IsString } from "class-validator";
import { Socket } from "socket.io";

export class WebSocketDTO {
    @IsNumber()
    port: number

    @IsString()
    origin: string = '*'

    connectHandler: (client: Socket) => void

    disconnectHandler: (client: Socket) => void

    receivers: Map<string, (client: Socket, payload: any) => void>
}