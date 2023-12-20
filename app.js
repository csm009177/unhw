import http from 'http';
import fs, { appendFileSync, writeFileSync } from 'fs';
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
    res.writeHead(200, { 'Content-Type': 'application/json' });
    const nameData = JSON.parse( fs.readFileSync(jsonPath, 'utf8'))
    const nameDataKeys =Object.values(nameData)
    const strnameData = JSON.stringify(nameData)
    console.log(strnameData)
    console.log(nameDataKeys)

  } else if (req.method === 'GET' && req.url === '/name.json') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    const nameData = JSON.parse( fs.readFileSync(jsonPath, 'utf8'))
    const strnameData = JSON.stringify(nameData)
    console.log(strnameData)
    fs.writeFileSync(jsonPath, nameData)
        
  }
  
})
// Define port number
const port = 3212;

// Start the server
serv.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});