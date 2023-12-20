// Import required modules
import http, { METHODS } from 'http';
import fs from 'fs';
import path from 'path';
const joinformPath = './join.html'

let serv = http.createServer((req, res) => {
    if (req.method === 'GET' && req.url === '/') {
        // Read the join.html file
        fs.readFile(path.join(__dirname, joinformPath), 'utf8', (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal Server Error');
                return;
            }

            // Set response header and send the file content
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        });
    } else {
        // Handle other routes or methods (here, just a basic 404 response)
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
});

// Define port number
const port = 3217;

// Start the server
serv.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});