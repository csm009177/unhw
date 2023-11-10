// import protocol
import http from 'http';
import express from 'express'
import fs from 'fs';
const app = express();

// declare port
let port = 3217;

// setting middle ware for serving static file 
app.use(express.static("public"));
// parse
// app.use(express.urlencoded({ extended: true }));


app.get('/', (req,res) => {
  res.sendFile('./doc/index.html')
})




app.listen(port, ()=> {
  console.log(`
http://localhost:${port}
`)
})

