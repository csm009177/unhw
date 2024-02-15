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

  // CSV 파일 읽어오는 엔드포인트
  server.get("/data.csv", (req, res) => {
    // CSV 파일을 읽어 클라이언트에게 텍스트로 전송합니다.
    fs.readFile("CPU_UserBenchmarks.csv", "utf8", (err, csvData) => {
      if (err) {
        res.status(500).send("Internal Server Error");
        return;
      }
      // CSV 데이터를 줄 단위로 분할하여 JSON 배열로 전송합니다.
      const lines = csvData.split("\n");
      const data = lines.map((line) => line.split(","));

      res.header("Content-Type", "application/json");
      res.status(200).json(data);
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
