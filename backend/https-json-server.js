import jsonServer from 'json-server';
import https from 'https';
import path from 'path';
import fs from 'fs';
//const pause = require('connect-pause'); // Install: npm install connect-pause

const server = jsonServer.create();
const router = jsonServer.router(path.join('/path/to/backend/', 'data.json'))
const middlewares = jsonServer.defaults();

server.use(middlewares);

server.use(jsonServer.bodyParser)
server.use((req, res, next) => {
  if (req.method === 'POST') {
    req.body.createdAt = Date.now()
  }
  next()
})

//server.use(pause(2000));
server.use(router);



const keyFile = path.join('/path/to/backend/', 'privkey.pem');
const certFile = path.join('/path/to/backend', 'fullchain.pem');

https
  .createServer(
	      {
		            key: fs.readFileSync(keyFile),
		            cert: fs.readFileSync(certFile),
		          },
	      server
	    )
  .listen(3000, '0.0.0.0',() => {
	      console.log(
		            'Go to https://0.0.0.0:3000/'
		          );
	    });
