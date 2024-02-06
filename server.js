const express = require("express");
const jwt = require('jsonwebtoken');
const mysql = require('mysql2');

// MariaDB 연결 설정
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "0177",
  database: "unhw",
  port: 3306,
});

const server = express();
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

// 회원가입 API 엔드포인트
server.post("/signup", (req, res) => {
  const { id, pw } = req.body;

  // 회원가입 정보를 DB에 삽입
  const query = "INSERT INTO users (id, pw) VALUES (?, ?)";
  connection.query(query, [id, pw], (err, results, fields) => {
    if (err) {
      console.error("Error signing up:", err);
      res.status(500).json({ message: "회원가입에 실패했습니다." });
      return;
    }
    res.status(200).json({ message: "회원가입이 완료되었습니다." });
  });
});

// 로그인 API 엔드포인트
server.post("/login", (req, res) => {
  const { id, pw } = req.body;

  // 해당 사용자가 존재하는지 확인하는 쿼리
  const query = "SELECT * FROM users WHERE id = ? AND pw = ?";
  connection.query(query, [id, pw], (err, results, fields) => {
    if (err) {
      console.error("Error logging in:", err);
      res.status(500).json({ message: "로그인에 실패했습니다." });
      return;
    }

    // 로그인 성공 여부 확인
    if (results.length > 0) {
      // 로그인 성공 시 JWT 토큰 생성
      const token = jwt.sign({ id }, 'secretKey', { expiresIn: '1h' });
      res.status(200).json({ message: "로그인 성공", token });
    } else {
      res.status(401).json({ message: "아이디 또는 비밀번호가 올바르지 않습니다." });
    }
  });
});

// 서버 시작
server.listen(3001, (err) => {
  if (err) throw err;
  console.log('> Ready on http://localhost:3001');
});
