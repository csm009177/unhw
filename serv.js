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

  // 회원가입 엔드포인트
  server.post("/signupForm", (req, res) => {
    const { id, pw, username } = req.body;

    const query = "INSERT INTO users (id, pw, username) VALUES (?, ?, ?)";
    connection.query(query, [id, pw, username], (err, results, fields) => {
      if (err) {
        console.error("Error signing up:", err);
        res.status(500).json({ message: "회원가입에 실패했습니다." });
        return;
      }
      res.status(200).json({ message: "회원가입이 완료되었습니다." });
    });
  });

 // 로그인 엔드포인트 
  server.post("/loginForm", (req, res) => {
    const { id, pw } = req.body;

    const query = "SELECT * FROM users WHERE id = ? AND pw = ? ";
    connection.query(
      query,
      [id, pw],
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

  server.get("/getUserInfo", (req, res) => {
    // 토큰에서 사용자 정보를 추출
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, secretKey);
    const username = decodedToken.username;
    res.status(200).json({ username });
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
