import React from 'react';
import {MessageDTO, Socket} from "./Socket";

export interface SocketCompProps {

}
export class SocketComp extends React.Component<SocketCompProps, any> {

    private socket: Socket = null;

    constructor(props: SocketCompProps) {
        super(props);
    }

    componentDidMount(): void {
        this.socket = new Socket((msg: any) => this.onMessage(msg));
        this.socket._connect();
    }

    componentWillUnmount(): void {
        this.socket && this.socket._disconnect();
    }

    render(): JSX.Element {
        return (
            <div>
                <div>Socket comp:</div>
                <button onClick={this.send} >Send</button>
            </div>


        );
    }

    send = () => {
        console.log("sending...");
        let msg: MessageDTO = {
            from: "yun",
            to: "Pan",
            content: "hello world"
        };
        this.socket._send(msg);
    };

    onMessage = (msg: any) => {
        console.log(msg);
    };
}