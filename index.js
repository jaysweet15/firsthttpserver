const http = require('node:http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  
  res.setHeader('Content-Type', 'text/plain');

  if (req.url === '/') {
    res.statusCode = 200;
    res.end('Welcome to my server!\n');

  } else if (req.url === '/health') {
    res.statusCode = 200;
    res.end('Server is healthy!\n');

  } else {
    res.statusCode = 404;
    res.end('Page not found\n');
  }

});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});