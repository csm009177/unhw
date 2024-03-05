import crypto from "crypto";
import jwt from "jsonwebtoken";
import mysql, { Connection, FieldPacket, QueryError, ResultSetHeader, RowDataPacket } from "mysql2";
import express, { Request, Response } from "express";
import next from "next";

const secretKey: string = crypto.randomBytes(32).toString("hex");

const connection: Connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "0177",
  database: "unhw",
  port: 3306,
});

// MariaDB, RDS 연결 설정
// const connection: Connection = mysql.createConnection({
//   host: "database-1.ctgo6osmy1q0.ap-northeast-2.rds.amazonaws.com",
//   user: "admin",
//   password: "gerrard177!",
//   database: "unhw",
//   port: 3306,
// });

const app = next({ dev: process.env.NODE_ENV !== "production" });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();
  server.use(express.json({ limit: "10mb" }));
  server.use(express.urlencoded({ extended: true, limit: "10mb" }));

  /**
   * 회원가입 요청 처리
   * @param {Request} req 요청 객체
   * @param {Response} res 응답 객체
   */
  server.post("/signupForm", (req: Request, res: Response) => {
    const { id, pw } = req.body;

    const query: string = "INSERT INTO users (id, pw, signupDate) VALUES (?, ?, NOW())";
    connection.query(query, [id, pw], (err: QueryError | null, results: any, fields: FieldPacket[]) => {
      if (err) {
        console.error("Error signing up:", err);
        res.status(500).json({ message: "회원가입에 실패했습니다." });
        return;
      }
      res.status(200).json({ message: "회원가입이 완료되었습니다." });
    });
  });

  /**
   * 로그인 요청 처리
   * @param {Request} req 요청 객체
   * @param {Response} res 응답 객체
   */
  server.post("/loginForm", (req: Request, res: Response) => {
    const { Identification, password } = req.body;

    const query: string = "SELECT * FROM users WHERE id = ? AND pw = ? ";
    connection.query(query, [Identification, password], (err: QueryError | null, results: RowDataPacket[], fields: FieldPacket[]) => {
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
        res.status(401).json({ message: "아이디 또는 비밀번호가 올바르지 않습니다." });
      }
    });
  });

  /**
   * 프로젝트 폼 입력 요청 처리
   * @param {Request} req 요청 객체
   * @param {Response} res 응답 객체
   */
  server.post("/pjtForm", (req: Request, res: Response) => {
    const { pjtContents, selectedPjtIndex } = req.body;

    const query: string = "INSERT INTO project (pjtContents, pjtNum, pjtDate) VALUES (?, ?, NOW())";
    connection.query(query, [pjtContents, selectedPjtIndex], (err: QueryError | null, results: any, fields: FieldPacket[]) => {
      if (err) {
        console.error("Error chatlog Form :", err);
        res.status(500).json({ message: "입력에 실패했습니다." });
        return;
      }
      res.status(200).json({ message: "입력이 완료되었습니다." });
    });
  });

  /**
   * 프로젝트 폼 정보 조회 요청 처리
   * @param {Request} req 요청 객체
   * @param {Response} res 응답 객체
   */
  server.get("/pjtForm/:pjtNum", (req: Request, res: Response) => {
    const pjtNum: string = req.params.pjtNum;

    const query: string = "SELECT pjtContents FROM project WHERE pjtNum = ?";
    connection.query(query, [pjtNum], (err: QueryError | null, results: RowDataPacket[], fields: FieldPacket[]) => {
      if (err) {
        console.error("Error fetching chat logs:", err);
        res.status(500).json({ message: "내용을 가져오는 중 오류가 발생했습니다." });
        return;
      }
      res.status(200).json({ pjtContents: results });
    });
  });

  // 나머지 엔드포인트도 비슷한 방식으로 작성 가능

  server.all("*", (req: Request, res: Response) => {
    return handle(req, res);
  });

  const port: number = 3000;
  server.listen(port, (err?: any) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
