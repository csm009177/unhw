import crypto from "crypto";
import jwt from "jsonwebtoken";
import mysql, {
  Connection,
  FieldPacket,
  QueryError,
  ResultSetHeader,
  RowDataPacket,
} from "mysql2";
import express, { Request, Response } from "express";
import next from "next";
const secretKey: string = crypto.randomBytes(32).toString("hex");

// MariaDB 연결 설정
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

// Next.js 애플리케이션을 설정합니다.
const app = next({ dev: process.env.NODE_ENV !== "production" });

// Next.js 애플리케이션의 요청 핸들러를 가져옵니다.
const handle = app.getRequestHandler();

// Next.js 애플리케이션을 준비합니다.
app.prepare().then(() => {
  // Express 서버를 생성합니다.
  const server = express();

  // JSON 파싱을 위한 미들웨어를 추가합니다. 요청 본문의 크기 제한을 10MB로 설정합니다.
  server.use(express.json({ limit: "10mb" }));

  // URL 인코딩을 위한 미들웨어를 추가합니다. extended 옵션을 true로 설정하여 객체나 배열 형태의 복잡한 요청 본문을 파싱할 수 있도록 합니다.
  server.use(express.urlencoded({ extended: true, limit: "10mb" }));

  /**
   * 회원가입 요청 처리
   * @param {Request} req 요청 객체
   * @param {Response} res 응답 객체
   */
  server.post("/signupForm", (req: Request, res: Response) => {
    // 클라이언트에서 전달받은 회원가입 폼 데이터를 추출합니다.
    const { id, pw, username, useraddress, useremail, userphonnumber } =
      req.body;

    // 데이터베이스에 사용자 정보를 삽입하는 SQL 쿼리를 작성합니다.
    const query: string =
      "INSERT INTO users (id, pw, username, useraddress, useremail, userphonnumber, signupdate) VALUES (?, ?, ?, ?, ?, ?, NOW())";

    // SQL 쿼리를 실행합니다.
    connection.query(
      query,
      [id, pw, username, useraddress, useremail, userphonnumber], // 바인딩할 값으로 배열을 전달합니다. 이 값들이 ?에 대체됩니다.
      (err: QueryError | null, results: any, fields: FieldPacket[]) => {
        if (err) {
          // 오류가 발생하면 콘솔에 오류를 기록하고 클라이언트에게 오류 메시지를 전송합니다.
          console.error("Error signing up:", err);
          res.status(500).json({ message: "회원가입에 실패했습니다." });
          return;
        }

        // 회원가입이 성공했을 경우 클라이언트에게 성공 메시지를 전송합니다.
        res.status(200).json({ message: "회원가입이 완료되었습니다." });
      }
    );
  });

  /**
   * 로그인 요청 처리
   */
  server.post("/loginForm", (req: Request, res: Response) => {
    // 요청에서 아이디와 비밀번호를 추출합니다.
    const { id, pw } = req.body;

    // 사용자가 입력한 아이디와 비밀번호를 확인하기 위한 SQL 쿼리를 작성합니다.
    const query: string = "SELECT * FROM users WHERE id = ? AND pw = ? ";

    // SQL 쿼리를 실행합니다.
    connection.query(
      query,
      [id, pw], // 바인딩할 값으로 배열을 전달합니다. 이 값들이 ?에 대체됩니다.
      (
        err: QueryError | null, // 쿼리 실행 중 발생한 오류를 담을 변수입니다.
        results: RowDataPacket[], // 쿼리 결과를 담을 변수입니다. 여러 행의 데이터가 배열로 반환됩니다.
        fields: FieldPacket[] // 쿼리 결과의 필드 정보를 담을 변수입니다.
      ) => {
        if (err) {
          // 오류가 발생하면 콘솔에 오류를 기록하고 클라이언트에게 오류 메시지를 전송합니다.
          console.error("Error logging in:", err);
          res.status(500).json({ message: "로그인에 실패했습니다." });
          return;
        }

        // 쿼리 결과가 하나 이상의 행을 반환하면 로그인 성공으로 간주합니다.
        if (results.length > 0) {
          // 첫 번째 행의 사용자 정보를 추출합니다.
          const user = results[0];

          // JWT를 생성하기 위한 payload를 설정합니다.
          const tokenPayload = {
            username: user.username, // 사용자 이름을 토큰에 담습니다.
          };

          // JWT를 생성하고 토큰을 반환합니다. 토큰은 1시간 동안 유효합니다.
          const token = jwt.sign(tokenPayload, secretKey, { expiresIn: "1h" });

          // 클라이언트에게 로그인 성공 메시지와 토큰을 전달합니다.
          res.status(200).json({ message: "로그인 성공", token });
        } else {
          // 쿼리 결과가 없으면 아이디 또는 비밀번호가 올바르지 않다고 간주하고 클라이언트에게 오류 메시지를 전송합니다.
          res
            .status(401)
            .json({ message: "아이디 또는 비밀번호가 올바르지 않습니다." });
        }
      }
    );
  });

  /**
   * 타입 버튼 나열 요청 처리
   */
  server.get("/fetchTypes", (req: Request, res: Response) => {
    const query = `SELECT DISTINCT type FROM item;`;
    connection.query(
      query,
      (
        err: QueryError | null, // 오류 객체 또는 null 값을 나타내는 매개변수
        results: RowDataPacket[], // 쿼리 실행 결과를 저장하는 매개변수
        fields: FieldPacket[] // 쿼리 결과의 필드 정보를 나타내는 매개변수
      ) => {
        if (err) {
          console.error("fetchTypes error:", err);
          res
            .status(500)
            .json({ message: "타입을 가져오는 중 문제가 발생했습니다." });
          return;
        }
        const types = results.map((result) => result.type);
        res.status(200).json({ types });
      }
    );
  });
  /**
   * 브랜드 버튼 나열 요청 처리
   */
  server.get("/fetchBrands", (req: Request, res: Response) => {
    const { type } = req.query;
    const query = `SELECT DISTINCT brand FROM item WHERE type = ?;`;
    connection.query(
      query,
      [type],
      (
        err: QueryError | null, // 오류 객체 또는 null 값을 나타내는 매개변수
        results: RowDataPacket[], // 쿼리 실행 결과를 저장하는 매개변수
        fields: FieldPacket[] // 쿼리 결과의 필드 정보를 나타내는 매개변수
      ) => {
        if (err) {
          console.error("fetchBrands error:", err);
          res
            .status(500)
            .json({ message: "브랜드를 가져오는 중 문제가 발생했습니다." });
          return;
        }
        const brands = results.map((result) => result.brand);
        res.status(200).json({ brands });
      }
    );
  });
  /**
   * 모델 버튼 나열 요청 처리
   */
  server.get("/fetchModels", (req: Request, res: Response) => {
    const { type, brand } = req.query;
    const query = `SELECT DISTINCT model FROM item WHERE type = ? AND brand = ?;`;
    connection.query(
      query,
      [type, brand],
      (
        err: QueryError | null, // 오류 객체 또는 null 값을 나타내는 매개변수
        results: RowDataPacket[], // 쿼리 실행 결과를 저장하는 매개변수
        fields: FieldPacket[] // 쿼리 결과의 필드 정보를 나타내는 매개변수
      ) => {
        if (err) {
          console.error("fetchModels error:", err);
          res
            .status(500)
            .json({ message: "모델을 가져오는 중 문제가 발생했습니다." });
          return;
        }
        const models = results.map((result) => result.model);
        res.status(200).json({ models });
      }
    );
  });
  /**
   * 모델데이터 버튼 나열 요청 처리
   */
  server.get("/fetchModelDatas", (req: Request, res: Response) => {
    const { type, brand, model } = req.query;
    const query = `SELECT * FROM item WHERE type = ? AND brand = ? AND model = ?;`;
    connection.query(
      query,
      [type, brand, model],
      (
        err: QueryError | null, // 오류 객체 또는 null 값을 나타내는 매개변수
        results: RowDataPacket[], // 쿼리 실행 결과를 저장하는 매개변수
        fields: FieldPacket[] // 쿼리 결과의 필드 정보를 나타내는 매개변수
      ) => {
        if (err) {
          console.error("fetchModelInfos error:", err);
          res
            .status(500)
            .json({ message: "모델 정보를 가져오는 중 문제가 발생했습니다." });
          return;
        }
        const modelDatas = results.map((result) => result);
        res.status(200).json({ modelDatas });
      }
    );
  });

  /**
   * 프로젝트 폼 입력 요청 처리
   */
  server.post("/pjtForm", (req: Request, res: Response) => {
    // 요청에서 프로젝트 내용과 선택된 프로젝트 인덱스를 추출합니다.
    const { pjtContents, selectedPjtIndex } = req.body;

    // 삽입 쿼리를 생성합니다.
    const query: string =
      "INSERT INTO project (pjtContents, pjtNum, pjtDate) VALUES (?, ?, NOW())";

    // 데이터베이스에 쿼리를 실행합니다.
    connection.query(
      query,
      [pjtContents, selectedPjtIndex],
      (
        err: QueryError | null, // 오류 객체 또는 null 값을 나타내는 매개변수
        results: any, // 쿼리 실행 결과를 저장하는 매개변수
        fields: FieldPacket[] // 쿼리 결과의 필드 정보를 나타내는 매개변수
      ) => {
        if (err) {
          // 오류가 발생한 경우 오류를 로깅하고 클라이언트에게 오류 응답을 전송합니다.
          console.error("Error chatlog Form :", err);
          res.status(500).json({ message: "입력에 실패했습니다." });
          return;
        }
        // 성공적으로 데이터베이스에 입력된 경우 클라이언트에게 성공 응답을 전송합니다.
        res.status(200).json({ message: "입력이 완료되었습니다." });
      }
    );
  });

  /**
   * 프로젝트 폼 정보 조회 요청 처리
   */
  server.get("/pjtForm/:pjtNum", (req: Request, res: Response) => {
    const pjtNum: string = req.params.pjtNum;

    const query: string = "SELECT pjtContents FROM project WHERE pjtNum = ?";
    connection.query(
      query,
      [pjtNum],
      (
        err: QueryError | null, // 오류 객체 또는 null 값을 나타내는 매개변수
        results: RowDataPacket[], // 쿼리 실행 결과를 저장하는 매개변수
        fields: FieldPacket[] // 쿼리 결과의 필드 정보를 나타내는 매개변수
      ) => {
        if (err) {
          console.error("Error fetching chat logs:", err);
          res
            .status(500)
            .json({ message: "내용을 가져오는 중 오류가 발생했습니다." });
          return;
        }
        res.status(200).json({ pjtContents: results });
      }
    );
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
