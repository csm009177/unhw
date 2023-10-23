const http = require('http');
const fs = require('fs');

let serv = http.createServer((req,res)=> {
  if(req.method === 'GET'){
    console.log(req.method);
    res.end(req.method);
  }
})

serv.listen(3217)