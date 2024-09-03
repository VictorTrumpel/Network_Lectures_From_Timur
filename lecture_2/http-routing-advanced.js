'use strict'

const http = require('http')

const PORT = 8000

const user = { name: 'Jura', age: 22 }

const routing = {
  '/': 'Welcome to homepage',
  '/user': user,
  '/user/name': () => user.name,
  '/user/age': () => user.age,
  '/user/*': (client, par) => 'parameter=' + par[0]
}

const types = {
  object: JSON.stringify,
  string: s => s,
  number: n => n + '',
  undefined: () => 'not found',
  function: (fn, par, client) => fn(client, par)  
}

const matching = [];
for (const key in routing) {
  if (key.includes('*')) {
    const rx = new RegExp(key.replace('*', '(.*)'));
    const route = routing[key];
    matching.push([rx, route]);
    delete routing[key];
  }
}

console.log('matching :>> ', matching)

const router = (client) => {
  const { url } = client.req;

  console.log('url :>> ', url)

  let route = routing[url];

  if (route) {
    const type = typeof route;
    const renderer = types[type];
    return renderer(route, params, client);
  }

  let params = [];
  for (const rx of matching) {
    console.log('rx :>> ', rx)
    params = url.match(rx[0]);
    console.log('params :>> ', params)
    if (!params) return
    params.shift();
    route = rx[1];
    break;
  }
};

http.createServer((req, res) => {
  res.end(`${router({ req, res })}`);
}).listen(PORT);

console.log(`Running server on port ${PORT}`);