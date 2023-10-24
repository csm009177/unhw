// http, fs
const http = require('http');
const fs = require('fs');
// custom module
const contenType = require('./mod/contenType');
const checkreq = require('./mod/checkreq');
const docMaker = require('./doc/doc');
const tagMaker = require('./mod/tagMaker');
// custom module use
let contHtml = contenType('text/html','utf8')
let testTag = tagMaker('div','width:100vw; height:100vh; background:black;')
let testDoc = docMaker('main', testTag)
// make server
let serv = http.createServer((req,res)=> {
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
})