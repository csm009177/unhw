function CheckServerError(port, serv){
  serv.on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
      console.error( port + 'is Already in use.');
    } else {
      console.error('server error : ' + error.message);
    }
  });
}

module.exports = CheckServerError;