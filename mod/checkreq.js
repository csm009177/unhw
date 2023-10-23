function checkreq(method, url){
  function callback () {
  return  console.log(`${method}
  ${url}
  `);
  }
}
module.exports = checkreq;