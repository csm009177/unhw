// 시크릿
const crypto = require("crypto");
const secretKey = crypto.randomBytes(32).toString("hex");
const jwt = require("jsonwebtoken"); // npm install jsonwebtoken
const mysql = require("mysql2"); // npm install mysql2
const express = require("express"); // npm install express
const next = require("next");
const isDev = process.env.NODE_ENV !== "development";
const app = next({ dev: isDev });
const handle = app.getRequestHandler();
const fs = require("fs");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "0177",
  database: "unhw",
  port: 3306,
});

app.prepare().then(() => {
  const server = express();
  server.use(express.json({ limit: "10mb" }));
  server.use(express.urlencoded({ extended: true, limit: "10mb" }));

  server.post("/signupForm", (req, res) => {
    const { Identification, pw } = req.body;

    const query = "INSERT INTO users (id, pw) VALUES (?, ?)";
    connection.query(query, [Identification, pw], (err, results, fields) => {
      if (err) {
        console.error("Error signing up:", err);
        res.status(500).json({ message: "회원가입에 실패했습니다." });
        return;
      }
      res.status(200).json({ message: "회원가입이 완료되었습니다." });
    });
  });

  server.post("/loginForm", (req, res) => {
    const { Identification, password } = req.body;

    const query = "SELECT * FROM users WHERE id = ? AND pw = ? ";
    connection.query(
      query,
      [Identification, password],
      (err, results, fields) => {
        if (err) {
          console.error("Error logging in:", err);
          res.status(500).json({ message: "로그인에 실패했습니다." });
          return;
        }

        if (results.length > 0) {
          const user = results[0];
          const tokenPayload = {
            username: user.username,
          };
          const token = jwt.sign(tokenPayload, secretKey, { expiresIn: "1h" });
          res.status(200).json({ message: "로그인 성공", token });
        } else {
          res
            .status(401)
            .json({ message: "아이디 또는 비밀번호가 올바르지 않습니다." });
        }
      }
    );
  });

  server.post("/pmpForm", (req, res) => {
    const { selectedItemIndex, pmpContents } = req.body;
    const query =
      "INSERT INTO prompt (pmpContents, itemNum, pmpDate) VALUES (?, ?, NOW())";
    connection.query(
      query,
      [pmpContents, selectedItemIndex],
      (err, results, fields) => {
        if (err) {
          console.error("Error chatlog Form :", err);
          res.status(500).json({ message: "채팅 입력에 실패했습니다." });
          return;
        }
        res.status(200).json({ message: "채팅 입력이 완료되었습니다." });
      }
    );
  });

  server.get("/pmpForm/:itemIndex", (req, res) => {
    const itemIndex = req.params.itemIndex;
    const query = "SELECT pmpContents FROM prompt WHERE itemNum = ?";
    connection.query(query, [itemIndex], (err, results, fields) => {
      if (err) {
        console.error("Error fetching chat logs:", err);
        res
          .status(500)
          .json({ message: "채팅 내용을 가져오는 중 오류가 발생했습니다." });
        return;
      }
      res.status(200).json({ chatLogs: results });
    });
  });

  server.post("/searchItems", (req, res) => {
    const { keyword } = req.body; // 클라이언트가 전달한 검색어
    
    // 검색어를 이용하여 데이터베이스에서 항목을 검색하는 쿼리
    const query = `
      SELECT * 
      FROM item 
      WHERE type LIKE '%${keyword}%' 
         OR part_number LIKE '%${keyword}%' 
         OR brand LIKE '%${keyword}%' 
         OR model LIKE '%${keyword}%' 
         OR url LIKE '%${keyword}%';
    `;
    
    // 데이터베이스에서 쿼리 실행
    connection.query(query, (err, results, fields) => {
      if (err) {
        console.error("searchItems error:", err);
        res.status(500).json({ message: "검색 중 문제가 발생했습니다." });
        return;
      }
      res.status(200).json({ items: results });
    });
  });
  
  // item에 있는 type들을 가져오는 엔드포인트
  server.get("/fetchTypes", (req, res) => {
    const query = `SELECT DISTINCT type FROM item;`; // 중복되지 않는 type 값들을 가져오는 쿼리
    connection.query(query, (err, results, fields) => {
      if (err) {
        console.error("fetchTypes error:", err);
        res.status(500).json({ message: "타입을 가져오는 중 문제가 발생했습니다." });
        return;
      }
      const types = results.map(result => result.type); // 결과에서 type 값들만 추출하여 배열로 반환
      res.status(200).json({ types });
    });
  });
  
  // item에 있는 선택된 타입에서 브랜드를 가져오는 엔드포인트
  server.get("/fetchBrands", (req, res) => {
    const { type } = req.query;
    const query = `SELECT DISTINCT brand FROM item WHERE type = ?;`;
    connection.query(query, [type], (err, results, fields) => {
      if (err) {
        console.error("fetchBrands error:", err);
        res.status(500).json({ message: "브랜드를 가져오는 중 문제가 발생했습니다." });
        return;
      }
      const brands = results.map(result => result.brand);
      res.status(200).json({ brands });
    });
  });

  // item에 있는 선택된 브랜드에서 모델을 가져오는 엔드포인트
  server.get("/fetchModels", (req, res) => {
    const { type, brand } = req.query;
    const query = `SELECT * FROM item WHERE type = ? AND brand = ?;`;
    connection.query(query, [type, brand], (err, results, fields) => {
      if (err) {
        console.error("fetchModels error:", err);
        res.status(500).json({ message: "모델을 가져오는 중 문제가 발생했습니다." });
        return;
      }
      const models = results.map(result => result.model);
      res.status(200).json({ models });
    });
  });

  // item에 있는 선택된 모델의 정보를 가져오는 엔드포인트
  server.get("/fetchModelInfos", (req, res) => {
    const { type, brand, model } = req.query;
    const query = `SELECT * FROM item WHERE type = ? AND brand = ? AND model = ?;`;
    connection.query(query, [type, brand, model], (err, results, fields) => {
      if (err) {
        console.error("fetchModelInfos error:", err);
        res.status(500).json({ message: "모델 정보를 가져오는 중 문제가 발생했습니다." });
        return;
      }
      const modelInfo = results.map(result => result);
      res.status(200).json({ modelInfo }); // "modelInfo"로 수정
    });
  });
  
  


  server.all("*", (req, res) => {
    return handle(req, res);
  });

  const port = 3000;
  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
