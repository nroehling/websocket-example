const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', ws => {
    console.log("A Client established the Connection to the Websocket Server!");

    ws.on('message', message => {
        console.log(`Received message => ${message}`);
        // Broadcast to everyone else.
        wss.clients.forEach(function each(client) {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });

    ws.on('error', error => {
        console.log("An error occurred " + error);
    });

    ws.on('close', () => {
        console.log("Client closed the connection!");
    })
});