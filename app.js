import http from "http";
import fs from "fs";
import mysql from "mysql";  // MySQL 데이터베이스 모듈

const PORT = 3213;
const JSONPath = "index.json";
const htmlPath = "index.html";

// MySQL 데이터베이스 연결을 설정합니다.
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "0177",
  database: "shop",
});


const serv = http.createServer((req, res) => {
  if (req.method === "GET" && req.url === "/") {
    fs.readFile(htmlPath, "utf8", (err, data) => {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(data);
    });
  } else if (req.method === "POST" && req.url === "/loadData") {
    fs.readFile(JSONPath, "utf8", (err, data) => {
      const jsonData = JSON.parse(data);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(jsonData));
    });
  }   // 요청이 GET 메서드이고 URL이 '/mariaDB'인 경우
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

serv.listen(PORT, () => {
  console.log(`http://localhost:${PORT}/`);
});
