function checkreq(){
  const allReq = req.method+req.url;
  return  console.log(allReq);
}

module.exports = checkreq;