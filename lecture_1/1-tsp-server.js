"use strict";

const net = require("net");

const onData = (data, ...args) => {
  console.dir({ args });
  console.log("client cmessage: " + data);
};

net
  .createServer((socket) => {
    console.dir(socket.address());
    socket.write("love");
    socket.on("data", onData);
  })
  .listen(2000);
