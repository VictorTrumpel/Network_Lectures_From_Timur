const net = require('net');

// Создаем TCP-сервер
const server = net.createServer((socket) => {
  socket.on('data', (data) => {
    // Конвертируем полученные данные в строку
    const request = data.toString();
    console.log('Request received:\n', request);

    // Парсим первую строку запроса для получения метода и URL
    const [requestLine] = request.split('\r\n');
    const [method, url] = requestLine.split(' ');

    console.log('method :>> ', method)


    // Проверяем, является ли запрос GET и соответствует ли URL
    if (method === 'GET') {
      // Формируем HTTP-ответ
      const response = `HTTP/1.1 200 OK\r\n` +
                       `Content-Type: text/plain\r\n` +
                       `Content-Length: 13\r\n` +
                       `\r\n` +
                       `Hello, World!`;


        console.log('response :>> ', response)
      // Отправляем ответ клиенту
      socket.write(response);
    } else {
      // Ответ на некорректные запросы
      const response = `HTTP/1.1 404 Not Found\r\n` +
                       `Content-Type: text/plain\r\n` +
                       `Content-Length: 9\r\n` +
                       `\r\n` +
                       `Not Found`;

      // Отправляем ответ клиенту
      socket.write(response);
    }

    // Закрываем соединение после ответа
    socket.end();
  });

  // Обработка ошибок
  socket.on('error', (err) => {
    console.error('Socket error:', err);
  });
});

// Запускаем сервер на порту 8080
server.listen(8080, () => {
  console.log('Server listening on port 8080');
});
