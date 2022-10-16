import Centrifuge from "centrifuge";

export const centrifuge = new Centrifuge('ws://localhost:8099/connection/websocket');

centrifuge.subscribe("news", function(message) {
    console.log(message);
});