import http from 'http';
import fs from 'fs';
const htmlPath = 'index.html'
const jsonPath = 'name.json'
const xhrPath = 'xhr.js'

const serv = http.createServer((req,res) =>{
  if (req.method === 'GET' && req.url === '/') {
    // Read the join.html file
    fs.readFile(htmlPath, 'utf8', (err, data) => {
        // Set response header and send the file content
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
    });
  } else if (req.method === 'GET' && req.url === '/xhr.js') {
    // Read the userData.json file and send its content as a response
    fs.readFile(xhrPath, 'utf8', (err, xhrData) => {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(xhrData);    
    })
  } else if (req.method === 'GET' && req.url === '/name.json') {
    // Read the userData.json file and send its content as a response
    fs.readFile(jsonPath, 'utf8', (err, jsonData) => {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(jsonData);    
    })
  }
})
// Define port number
const port = 3212;

// Start the server
serv.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});