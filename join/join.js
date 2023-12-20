// Import required modules
import http, { METHODS } from 'http';
import fs from 'fs';
import path from 'path';

// Create a server
const server = http.createServer((req, res) => {
    // Set static file serving logic
    if (req.url === '/' || req.url === '/join.html') {
        fs.readFile(path.join('./join.html'), (err, content) => {
            if (err) throw err;
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(content);
        });
    } else if (req.url === '/join.js') {
        fs.readFile(path.join('./join.js'), (err, content) => {
            if (err) throw err;
            res.writeHead(200, { 'Content-Type': 'application/javascript' });
            res.end(content);
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>404 Not Found</h1>');
    }
});

// Define port number
const port = 3217;

// Start the server
server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});