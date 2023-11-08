// http, fs
const http = require('http');
const fs = require('fs');
// port
let port =3217;
// custom module
const contentType = require('./mod/contenType')


// make server
let serv = http.createServer((req,res)=> {
  if(req.method === 'GET' && req.url === '/'){
    fs.readFileSync('./doc/index.html', (err, data)=> {
      if(err){console.log(`readFile error : ${err}`)}
      else {        
        res.writeHead(200, contentType)
        res.end(data)
      }
    })
  } 
})

// server listen
serv.listen(port, () => {
  console.log(`
아래의 링크를 Clt와 함께 누르세요
http://localhost:${port}  
  `)
});
