const { WebSocketServer } = require('ws');

const wss = new WebSocketServer({ port: 8080, clientTracking: true });

module.exports = {
    wss
}
