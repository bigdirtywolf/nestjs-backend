import { ResultData } from "src/const/Result";
import { WebSocketManager } from "src/const/WebSocketManager";
import { WebSocketDTO } from "src/dto/WebSocketDTO";

export class WebSocketService {
    constructor() {}

    async createWebSocket(webSocketDTO: WebSocketDTO) {
        try {
            const ws = new WebSocketManager(webSocketDTO)
            ws.start()

            return ResultData.success({
                clientId: ws.id,
            })
        } catch(error) {
            console.log(error)
            return ResultData.fail(error.message)
        }
    }
}