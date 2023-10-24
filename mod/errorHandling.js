// errorHandling.js

// 404 Not Found 오류 처리
function handleNotFound(req, res) {
  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end('Not Found\n');
}

// 500 Internal Server Error 오류 처리
function handleInternalServerError(req, res, error) {
  res.writeHead(500, { 'Content-Type': 'text/plain' });
  res.end('Internal Server Error\n');
  console.error('오류 발생:', error);
}

module.exports = {
  handleNotFound,
  handleInternalServerError,
};

