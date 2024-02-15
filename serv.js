const crypto = require('crypto');
const secretKey = crypto.randomBytes(32).toString('hex');
const jwt = require('jsonwebtoken');  // npm install jsonwebtoken
const mysql = require('mysql2');      // npm install mysql2
const express = require("express");   // npm install express
const next = require('next');
const isDev = process.env.NODE_ENV !== 'development';
const app = next({ dev: isDev });
const handle = app.getRequestHandler();
// const multer = require('multer');
const fs = require('fs')


// MariaDB, RDS 연결 설정
// const connection = mysql.createConnection({
//   host: "database-1.ctgo6osmy1q0.ap-northeast-2.rds.amazonaws.com",
//   user: "admin",
//   password: "gerrard177!",
//   database: "unhw",
//   port: 3306,
// });

// MariaDB, localhost 연결 설정
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "0177",
  database: "unhw",
  port: 3306,
});


// // multer 설정
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, '../user/public'); // 이미지를 저장할 경로 설정
//   },
//   filename: function (req, file, cb) {
//     cb(null, `${req.body.productName}.png`);
//   },
// });

// const upload = multer({
//   storage: storage,
// });

// // 카테고리 이미지추가 multer설정
// const cateStorage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, '../user/public'); // 카테고리 이미지 저장 경로
//   },
//   filename: function (req, file, cb) {
//     cb(null, `${req.body.category}.png`);
//   },
// });
// const uploadCate = multer({
//   storage : cateStorage
// });


app.prepare().then(() => {
  const server = express();
  server.use(express.json({ limit: '10mb' })); // JSON 데이터를 해석하는 미들웨어에 대한 크기 제한 설정
  server.use(express.urlencoded({ extended: true, limit: '10mb' })); // URL-encoded 데이터를 해석하는 미들웨어에 대한 크기 제한 설정


  // 회원가입 API 엔드포인트
  server.post("/signupForm", (req, res) => {
    const { Identification, pw } = req.body;

    // 회원가입 정보를 DB에 삽입
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

  // 로그인 API 엔드포인트
  server.post("/loginForm", (req, res) => {
    const { Identification, password } = req.body;

    // 해당 사용자가 존재하는지 확인하는 쿼리
    const query = "SELECT * FROM users WHERE id = ? AND pw = ? ";
    connection.query(query, [Identification, password], (err, results, fields) => {
      if (err) {
        console.error("Error logging in:", err);
        res.status(500).json({ message: "로그인에 실패했습니다." });
        return;
      }

      // 로그인 성공 여부 확인
      if (results.length > 0) {
        const user = results[0];
        const tokenPayload = {
          username : user.username
        }
        const token = jwt.sign(tokenPayload, secretKey, { expiresIn: '1h' });
        res.status(200).json({ message: "로그인 성공", token });
      } else {
        res.status(401).json({ message: "아이디 또는 비밀번호가 올바르지 않습니다." });
      }
    });
  });

  server.post("/pmpForm", (req, res) => {
    const { selectedItemIndex, pmpContents } = req.body;
    const query = "INSERT INTO prompt (pmpContents, itemNum, pmpDate) VALUES (?, ?, NOW())"; // 아이템 인덱스도 함께 저장
    connection.query(query, [pmpContents, selectedItemIndex], (err, results, fields) => {
      if (err) {
        console.error("Error chatlog Form :", err);
        res.status(500).json({ message: "채팅 입력에 실패했습니다." });
        return;
      }
      res.status(200).json({ message: "채팅 입력이 완료되었습니다." });
    });

      // CSV 파일에 추가할 데이터 준비
  // const csvData = `${selectedItemIndex},${pmpContents}\n`;

  // CSV 파일에 데이터 추가
  // fs.appendFile('data.csv', csvData, 'utf8', (err) => {
  //   if (err) {
  //     console.error("Error adding chat to CSV:", err);
  //     res.status(500).json({ message: "채팅 입력에 실패했습니다." });
  //     return;
  //   }
  //   console.log("Chat added to CSV successfully!");
  //   res.status(200).json({ message: "채팅 입력이 완료되었습니다." });
  // });
  });
  
  server.get("/pmpForm/:itemIndex", (req, res) => {
    const itemIndex = req.params.itemIndex;
    // 해당 아이템에 대한 채팅 내용을 DB에서 가져오는 쿼리
    const query = "SELECT pmpContents FROM prompt WHERE itemNum = ?";
    connection.query(query, [itemIndex], (err, results, fields) => {
      if (err) {
        console.error("Error fetching chat logs:", err);
        res.status(500).json({ message: "채팅 내용을 가져오는 중 오류가 발생했습니다." });
        return;
      }
      res.status(200).json({ chatLogs: results });
    });
  });

  server.post("/newEndpoint", (req, res) => {
    // 새로운 엔드포인트에 대한 로직을 작성하세요
    res.status(200).json({ message: "새로운 엔드포인트 동작 확인" });
  });
  
  // 기존의 라우팅을 변경하거나 추가할 때는 필요한 만큼 라우터를 정의합니다.
  // 예를 들어, GET 요청에 대한 새로운 핸들러를 추가할 수 있습니다.
  server.get("/someNewRoute", (req, res) => {
    res.status(200).json({ message: "새로운 라우트 동작 확인" });
  });
  
  // Next.js 서버에 라우팅 위임
  server.all('*', (req,res) =>{
    return handle(req,res)
  });

  // 서버 시작
  const port = 3000
  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});