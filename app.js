// http, fs
const http = require('http');
const fs = require('fs');
// custom module
const contenType = require('./mod/contenType');
const checkreq = require('./mod/checkreq');
const docMaker = require('./doc/docMaker');
const tagMaker = require('./mod/tagMaker');
const { styleWhite, styleDark, styleGray } = require('./mod/asteriskStyle');
const arrange = require('./mod/contentArrange');
const togColor = require('./mod/toggleMaker');

// custom module use
let contHtml = contenType('text/html','utf8');
// tags
let submitBnt   = tagMaker('button',  'search',  '', 
  'width:15vw; height:10vh; background:darkgray;');
let searchInput = tagMaker('input',   '',     'type="text"', 
'width:40vw; height:10vh; background:white;');
let toggleString = `
  <script>
    let toggle = document.getElementById('tog');
    toggle.innerHTML = "User";
    toggle.style.color = "green";
    // targetElement.style.color = togHandle ? before : after;
    // let togHandle = true;
      toggle.addEventListener('click', (eventTarget)=> {
        if (toggle.innerHTML==="User") {
          toggle.style.color = "red";
          toggle.innerHTML = "Expert"
          console.log(togHandle);
          // 핸들러가 참이라면 핸들러를 거짓으로 바꿔줘
        } else {
          togHandle = true; // 아니라면 핸들러를 참으로 바꿔줘
          toggle.style.color = "green";
          toggle.innerHTML = "User";
          console.log(togHandle);
        }
      })</script>`
// let toggleString = togColor('maindoc', 'tog', 'green','red');
let toggleAtag  = tagMaker('', '', '', '') 
let toggle      = tagMaker('button',  '',     'id= "tog" type="button" value="" ', 
  'width:15vw; height:10vh; background:darkgray;');
let cont        = tagMaker('div',     toggle+searchInput+submitBnt, '', 
  'display:flex; width:70vw; height:10vh; background:black;');
// bigcont created for centering
let bigCont     = tagMaker('div',     cont,    '', 
  arrange('center', 'center')+'width:100vw; height:100vh; background:black;');
  // doc
  let mainDoc = docMaker('main', styleGray(), bigCont+toggleString);


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
    res.end(mainDoc);
    

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
