// import express
const express = require('express')

const app = express();
const port = 3217;

app.use(express.static('public'));
app.use(express.json())

//라우트
// const {getMainpage} = require('./routes/rootRoute.js')
// app.get('/', getMainpage)
const {postMessageData} = require('./routes/rootRoute.js')
app.post('/savedata', postMessageData)

//서버가동
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});