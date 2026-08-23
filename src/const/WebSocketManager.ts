import { Server, Socket } from 'socket.io';
import { WebSocketDTO } from 'src/dto/WebSocketDTO';

export class WebSocketManager {
    public id: string
    private server: Server

    constructor(
        private readonly webSocketDTO: WebSocketDTO,
    ) {}

    start() {
        try {
            this.server = new Server(this.webSocketDTO.port, {
                cors: {
                    origin: this.webSocketDTO.origin
                }
            })

            this.server.on('connection', (client: Socket) => {
                this.id = client.id
                this.webSocketDTO.connectHandler(client);

                client.on('message', (payload: any) => {
                    const { type, data } = payload
                    if(this.webSocketDTO.receivers.has(type)) {
                        const handler = this.webSocketDTO.receivers.get(type) || (() => {})
                        handler(client, data)
                    }
                })

                client.on('disconnect', () => {
                    this.webSocketDTO.disconnectHandler(client)
                })
            })
        } catch(error) {
            console.log(error)
        }
    }

    close() {
        this.server.close();
    }
}