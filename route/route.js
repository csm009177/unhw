const http = require('http');
const fs = require('fs');
// custom module
const contenType = require('./mod/contenType');
const checkreq = require('./mod/checkreq');
const docMaker = require('./doc/docMaker');
const tagMaker = require('./mod/tagMaker');
const { styleWhite, styleDark, styleGray } = require('./mod/asteriskStyle');
const arrange = require('./mod/contentArrange');
const toggleMaker = require('./mod/toggleMaker');


function rootRoute(contenType, toggleMaker, checkreq, arrange ){
// custom module use
let contHtml = contenType('text/html','utf8');
// submit Bnt
let submitBnt   = tagMaker('button',  'search',  '', 
  'width:15vw; height:10vh; background:darkgray; font-size: 7vh;');
// input
let searchInput = tagMaker('input',   '',     'type="text"', 
'width:40vw; height:10vh; background:white;');
// toggle tag
let toggleScript = toggleMaker('tog', 'User', 'green', 'Expert', 'red');
let toggleTag   = tagMaker('button',  '',     'id= "tog" type="button" value="" ', 
  'width:15vw; height:10vh; background:darkgray; font; font-size: 7vh;');
//cont
let cont        = tagMaker('div',     toggleTag+searchInput+submitBnt, '', 
  'display:flex; width:70vw; height:10vh; background:black;');
// bigcont is body cont
let bigCont     = tagMaker('div',     cont,    '', 
  arrange('center', 'center')+'width:100vw; height:100vh; background:black;');
  // doc
let mainDoc = docMaker('main', styleGray(), bigCont+toggleScript);
}

module.exports = rootRoute;