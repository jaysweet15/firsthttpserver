const http = require('node:http');

const hostname = '127.0.0.1';
const port = 3000;

const users = [
    { id: 1, name: "Alex", role: "admin" },
    { id: 2, name: "Jordan", role: "user" },
    { id: 3, name: "Sam", role: "user" }
];

const products = [
    { id: 1, name: "Laptop", price: 900 },
    { id: 2, name: "Mouse", price: 25 },
    { id: 3, name: "Keyboard", price: 75 }
];

const server = http.createServer((req, res) => {

    if (req.method === 'GET' && req.url === '/') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Welcome to my backend server!');

    } else if (req.method === 'GET' && req.url === '/users') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');

        res.end(JSON.stringify(users));

    } else if (req.method === 'GET' && req.url.startsWith('/users/')) {
        
        const userId = Number(req.url.split('/')[2]);
        
        const user = users.find(user => user.id === userId);
        
        if (user) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(user));
        } else {
            res.statusCode = 404;
            res.setHeader('Content-Type', 'text/plain');
            res.end('User not found');
        }
        
    } else if (req.method === 'GET' && req.url === '/products') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(products));

    } else if (req.method === 'GET' && req.url === '/health') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Server is healthy!');

    } else if (req.method === 'POST' && req.url === '/users') {

    let body = '';

    req.on('data', chunk => {
        body += chunk;
    });

    req.on('end', () => {
        try {
            const userData = JSON.parse(body);

    if (typeof userData.name !== 'string' || userData.name.trim() === '') {
                res.statusCode = 400;
                res.setHeader('Content-Type', 'text/plain');
                res.end('Name is required and must be a non-empty string');
                return;
            }

            const newUser = {
                id: users.length + 1,
                name: userData.name,
                role: userData.role
            };

            users.push(newUser);

            res.statusCode = 201;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(newUser));

        } catch (error) {
            res.statusCode = 400;
            res.setHeader('Content-Type', 'text/plain');
            res.end('Invalid JSON');
        }
    });
        
    } else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Page not found');
    }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});