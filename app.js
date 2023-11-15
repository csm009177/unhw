// import express
import express from 'express'
const app = express();
// declare port
const port = 3217;


app.use(express.static('public')); // 정적 파일 서비스

app.get('/login', (req,res)=> {
  
})

app.listen(port, ()=> {
  console.log(`
  http://localhost:${port}
  `)
})