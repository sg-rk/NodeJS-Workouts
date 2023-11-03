const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8082 }, () => {
    console.log('Web socket server started!')
});

wss.on('connection', (ws) => {
    ws.on('open', (d) => {
        console.log(`Client new connection ${d}`);
    })

    ws.on('message', (m) => {
        console.log('Message from client : ', m.toString());
    })

    ws.send('Hello Client, Welcome to webSocket world!')
})