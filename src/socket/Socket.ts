import * as Stomp from 'stompjs';
import SockJS from "sockjs-client";
import {Frame, Message} from "stompjs";
// import * as SockJS from 'sockjs-client';
export interface MessageDTO {
    from: string;
    to: string;
    content: string;
}

export class Socket {
    topic: string = "/topic/news";
    stompClient: any;

    constructor(private messageHandler: (msg: any) => void){
        console.log("Socket init")
    }

    _connect() {
        console.log("Initialize WebSocket Connection");
        let ws = new SockJS('http://localhost:8080/ws');
        this.stompClient = Stomp.over(ws);
        const _this = this;
        _this.stompClient.connect({}, function (frame: Frame) {
            _this.stompClient.subscribe(_this.topic, function (sdkEvent: Message) {
                console.log("### topic back from server", sdkEvent);
                _this.onMessageReceived(sdkEvent);
            });
            //_this.stompClient.reconnect_delay = 2000;
        }, this.errorCallBack);
    };

    _disconnect() {
        if (this.stompClient !== null) {
            this.stompClient.disconnect();
        }
        console.log("Disconnected");
    }

    // on error, schedule a reconnection attempt
    errorCallBack(error: any) {
        console.log("errorCallBack -> " + error)
        setTimeout(() => {
            this._connect();
        }, 5000);
    }

    /**
     * Send message to sever via web socket
     * @param {*} message
     */
    _send(message: MessageDTO) {
        console.log("###calling logout api via web socket");
        this.stompClient.send("/app/ws", {}, JSON.stringify(message));
    }

    onMessageReceived(message: Message) {
        console.log("###Message Recieved from Server :: " + message);
        console.log(JSON.stringify(message.body));
        this.messageHandler(message);
    }
}
