const http = require('http');
const fs = require('fs');
const contenType = require('./mod/contenType');
const checkreq = require('./mod/checkreq');
let contHtml = contenType('text/html','utf8')



let serv = http.createServer((req,res)=> {
  if(req.method === 'GET' && req.url === '/'){
    // console.log(req.method);
    // console.log(req.url);
    checkreq(req.method, req.url);
    res.writeHead(200, contHtml); 
    res.end('hello');
  }
})

let port =3217;
serv.listen(port, () => {
  console.log(`
아래의 링크를 Clt와 함께 누르세요
http://localhost:${port}  
  `)
})