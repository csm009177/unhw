// http, fs
const http = require('http');
const fs = require('fs');
// custom module
const contenType = require('./mod/contenType');
const checkreq = require('./mod/checkreq');
const docMaker = require('./doc/doc');
const tagMaker = require('./mod/tagMaker');
const { styleWhite, styleDark } = require('./mod/asteriskStyle');


// custom module use
let contHtml = contenType('text/html','utf8');
let submitBnt = tagMaker('input', '','width:15vw; height:10vh; background:black;', '');
let searchInput = tagMaker('input', '', '', 'width:40vw; height:10vh; background:black;', '');
let toggle = tagMaker('button', '', '',
  'width:15vw; height:10vh; background:black;', 'search');
let cont = tagMaker('div', '', '',
  'width:70vw; height:10vh; background:black;');
let testDoc = docMaker('main', styleDark() ,cont);


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
    // console.log(req.method);
    // console.log(req.url);
    checkreq(req.method, req.url);
    res.writeHead(200, contHtml); 
    res.end(testDoc);
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
