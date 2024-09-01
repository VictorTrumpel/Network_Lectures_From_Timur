'use strict';

const net = require('node:net')

const connection = (socket) => {
  // выводим информацию
  console.dir({
    localAddress: socket.localAddress,
    localPort: socket.localPort,
    remoteAddress: socket.remoteAddress,
    remoteFamily: socket.remoteFamily,
    remotePort: socket.remotePort,
    bufferSize: socket.bufferSize,
  });
    
  // отправляем сердечко клиенту
  socket.write('💗');

  // когда сокет получает дату от клиента
  socket.on('data', (data) => {
    console.log('Event: 📨', data);
    console.log('Data:', data.toString());
  });

  // через сокет больше нечего качать. Сокет свободен
  socket.on('drain', () => {
    console.log('Event: 🤷');
  });

  // когда клиент отключился
  // информация о том, сколько байтов было прочитано и сколько байтов было записано
  socket.on('end', () => {
    console.log('Event: 🏁');
    console.dir({
      bytesRead: socket.bytesRead,
      bytesWritten: socket.bytesWritten,
    });
  });

  socket.on('error', (err) => {
    console.log('Event: 💩');
    console.log(err);
  });

  socket.on('timeout', () => {
    console.log('Event: ⌛');
  });
}

const server = net.createServer();

server.on('connection', connection);

server.listen(2000);