// Import required modules
import http, { METHODS } from 'http';
import fs from 'fs';
import path from 'path';
const joinformPath = './join.html'
const joinlogigPath = './joinscript.js'
const userDataPath = './userData.json'


let serv = http.createServer((req, res) => {
    if (req.method === 'GET' && req.url === '/') {
        // Read the join.html file
        fs.readFile(joinformPath, 'utf8', (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal Server Error');
                return;
            }
            // Set response header and send the file content
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        });
    } else if(req.method === 'GET' ){
        fs.readFile(joinlogigPath, 'utf8', (err, jsData)=>{
            res.writeHead(200, { 'Content-Type': 'javascript/application' });
            res.end(jsData);
        }) 
    } else if(req.method === 'POST' ){
        fs.readFile(userDataPath, 'utf8', (err, jsonData)=>{
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(jsonData);
        }) 
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