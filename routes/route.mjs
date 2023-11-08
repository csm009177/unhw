import http from 'http';
import fs from 'fs';

export function entryPoint(req, res, contenType){
  if (req.method === "GET"&&req.url === '/'){
    console.log(`
method : ${req.method} 
url : ${req.url}`)
    fs.readFile('./doc/index.html', (err,data)=> {
      if(err) {
        console.log('readFile error')
      } else {
        res.writeHead(200, contenType)
        res.end(data)
      }
    })
  }
}