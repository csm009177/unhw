// import protocol
import http from 'http';
import fs from 'fs';
import { contenType } from './mod/contenType.mjs';

// declare port
let port = 3217;


let serv = http.createServer((req, res)=> {
  if (req.method === "GET"&&req.url === '/'){
    console.log(`method : ${req.method} url : ${req.url}`)
    fs.readFile('./doc/index.html', (err,data)=> {
      if(err) {
        console.log('readFile error')
      } else {
        res.writeHead(200, contenType)
        res.end(data)
      }
    })
  }
})

serv.listen(port, ()=> {
  console.log(`
http://localhost:${port}
`)
})

