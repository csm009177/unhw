// http, fs
const http = require('http');
const fs = require('fs');
// custom module
const contenType = require('./mod/contenType')
let contenTypeHtml = contenType("text/html", 'utf8')

const docMaker = require('./doc/docMaker')
let maindoc = docMaker('main', "width:100vw; height:100vh" , 'test')


// make server
let serv = http.createServer((req,res)=> {
  serv.on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
      console.error('포트 ' + port + '은 이미 사용 중입니다. 다른 포트를 시도하세요.');
    } else {
      console.error('서버에서 오류 발생: ' + error.message);
    }
  });
  if(req.method === 'GET' && req.url === '/'){
    checkreq(req.method, req.url);
    res.writeHead(200, contenTypeHtml); 
    res.end(maindoc);
  } 
})


// port
let port =3217;
// server listen
serv.listen(port, () => {
  console.log(`
아래의 링크를 Clt와 함께 누르세요
http://localhost:${port}  
  `)
});
