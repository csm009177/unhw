// Import required modules
const http = require('http');
const fs = require('fs');
const path = require('path');

// Create a server
const server = http.createServer((req, res) => {
    // Set static file serving logic
    if (req.url === '/' || req.url === '/join.html') {
        fs.readFile(path.join(__dirname, 'public', 'join.html'), (err, content) => {
            if (err) throw err;
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(content);
        });
    } else if (req.url === '/join.js') {
        fs.readFile(path.join(__dirname, 'public', 'join.js'), (err, content) => {
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