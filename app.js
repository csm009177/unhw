const http = require('http');
const fs = require('fs');

let serv = http.createServer((req,res)=> {
  if(req.method === 'GET'){
    console.log(req.method);
    res.end(req.method);
  }
})

let port =3217;
serv.listen(port, () => {
  console.log(`
아래의 링크를 Clt와 함께 누르세요
http://localhost:${port}  
  `)
})