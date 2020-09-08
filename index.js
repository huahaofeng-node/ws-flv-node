const { APP } = require('./app.config');
const { createWebSocketStream, Server } = require('ws');
const http = require('http');
const express = require('express');
const { join } = require('path');
const { pipeline } = require('stream');

async function bootstrap() {
  const app = express();
  app.use(express.static(join(__dirname, 'static')));
  const server = http.createServer(app);
  const wss = new Server({ server });

  wss.on('connection', (ws, req) => {
    console.log(`[WEBSOCKET] connection(): ${req.url}`);
    const httpFlv = `${APP.HTTP_FLV}${req.url}`;
    const stream = createWebSocketStream(ws);
    http.get(httpFlv, (res) => {
      pipeline(res, stream, (err) => {
        if (err) {
          console.error(err);
        }
      });
    });
  });
  wss.on('error', error => {
    console.error(error);
  });

  server.listen(APP.PORT, () => {
    console.log(`server started at ${JSON.stringify(server.address())}`);
  });

}

bootstrap();

