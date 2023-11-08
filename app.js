// http, fs
const http = require('http');
const fs = require('fs');
// port
let port =3217;

CheckServerError(port, serv)
// make server
let serv = http.createServer((req,res)=> {
  if(req.method === 'GET' && req.url === '/'){
    // console.log(req.method);
    // console.log(req.url);
    checkreq(req.method, req.url);
    res.writeHead(200, contHtml); 
    res.end(mainDoc);
  } 
})

// server listen
serv.listen(port, () => {
  console.log(`
아래의 링크를 Clt와 함께 누르세요
http://localhost:${port}  
  `)
});
