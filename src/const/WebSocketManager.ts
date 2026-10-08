import { Server, Socket } from 'socket.io';
import { WebSocketDTO } from 'src/dto/WebSocketDTO';

export class WebSocketManager {
    public id: string
    private server: Server
    private webSocketDTO: WebSocketDTO

    constructor(
        webSocketDTO: WebSocketDTO,
    ) {
        this.webSocketDTO = webSocketDTO

        if(!webSocketDTO.connectHandler || typeof webSocketDTO.connectHandler !== 'function') {
            this.webSocketDTO.connectHandler = (client: Socket) => {
                console.log('连接成功：',client.id)

                client.emit('connect', {
                    success: true,
                    id: client.id,
                })
            }
        }

        if(!webSocketDTO.disconnectHandler || typeof webSocketDTO.disconnectHandler !== 'function') {
            this.webSocketDTO.disconnectHandler = (client: Socket) => {
                console.log('连接断开：',client.id)

                client.emit('disconnect', {
                    success: true,
                    id: client.id,
                })
            }
        }
    }

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