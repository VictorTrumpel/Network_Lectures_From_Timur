'use strict';

const fs = require('fs')
const http = require('http')
const WebSocket = require('ws');

const PORT = 8000

const staticPage = fs.readFileSync('./index.html', 'utf-8')

const server = http.createServer((_, res) => {
  res.writeHead(200)
  res.end(staticPage)  
})

server.listen(PORT, () => {
  console.log(`Server running on http://127.0.0.1:${PORT}`)
})

const ws = new WebSocket.Server({ server })

const connection = (socket = new WebSocket(), request = new http.IncomingMessage()) => {
  const ip = request.socket.remoteAddress

  console.log(`Connected ${ip}`)

  socket.on('message', (message) => {
    for (const client of ws.clients) {
      const isClientReady = client.readyState === WebSocket.OPEN
      if (!isClientReady) continue
      client.send(message, { binary: false })
    }
  })

  socket.on('close', () => {
    console.log(`Disconnect ${ip}`)
  })
}

ws.on('connection', connection)