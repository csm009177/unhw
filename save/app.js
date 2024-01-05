// 필요한 모듈들을 import 합니다.
import http from "http";    // HTTP 모듈
import fs from "fs";        // 파일 시스템 모듈
import mysql from "mysql";  // MySQL 데이터베이스 모듈
const port = 3218;
const fetchHtmlPath = "./index.html";
const xhrHtmlPath = "./xhr.html";

// MySQL 데이터베이스 연결을 설정합니다.
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "0177",
  database: "shop",
});

// HTTP 서버를 생성합니다.
const serv = http.createServer((req, res) => {
  // 요청이 GET 메서드이고 URL이 '/'인 경우
  if (req.method === "GET" && req.url === "/") {
    // index.html 파일을 읽어 응답으로 보냅니다.
    fs.readFile(xhrHtmlPath, "utf8", (err, data) => {
      // 응답 헤더 설정 및 파일 내용 전송
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(data);
    });
  } 
  // 요청이 GET 메서드이고 URL이 '/mariaDB'인 경우
  else if (req.method === "GET" && req.url === "/mariaDB") {
    // 'product' 테이블에서 모든 상품을 조회하는 SQL 쿼리를 작성합니다.
    const productQuery = "SELECT * FROM product"; // shop의 product table을 query에 담습니다

    // SQL 쿼리를 실행하여 상품 목록을 가져옵니다.
    connection.query(productQuery, (error, results) => {
      // 에러 발생 시 500 Internal Server Error 응답
      if (error) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Internal Server Error" }));
      } 
      // 결과가 성공적으로 반환되면 200 OK 응답과 상품 목록 반환
      else {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(results)); 
      }
    });
  }
});

// 서버를 지정된 포트에서 실행하고 연결을 기다립니다.
serv.listen(port, () => {
  console.log(`
Server running at http://localhost:${port}
  `);
});