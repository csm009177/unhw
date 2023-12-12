// import express
import express from 'express';
const app = express();
const port = 3217;
import mysql from 'mysql2';


app.use(express.static('public'));

const connection = mysql.createConnection({
  host: "localhost", // MariaDB 호스트 주소
  user: "root", // MariaDB 사용자명
  password: "0177", // MariaDB 비밀번호
  database: "choi", // MariaDB 데이터베이스명
});



app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});