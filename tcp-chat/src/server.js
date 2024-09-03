"use strict";

const PORT = 8000

const net = require("node:net");

const server = new net.Server()

const connection = (socket = new net.Socket()) => {
  
  console.log('Новый сокет подключился')
}

server.listen(8000)

server.on('listening', () => {
  console.log(`Сервер работает на ${PORT} порту`)
})

server.on('connection', connection)


