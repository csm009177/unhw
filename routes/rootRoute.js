// routes/routes.js
const express = require('express')
const fs = require('fs')
const path = require('path')
const router = express.Router();
// router.use(express.json()); // Parse JSON data in request body

// router.get('/', (req, res) => {
//   const indexHtmlPath = path.join(__dirname, '../public/index.html')
//   res.sendFile(indexHtmlPath)
// });

router.post('/savedata', (req, res) => {
  const newData = req.body.newData
  const timestamp = new Date().toLocaleTimeString();
  const indexJsonDataPath = path.join(__dirname,'../public/index.json')
  let messageData = {}

  fs.readFile(indexJsonDataPath), (err, data) => {

    if (err) {
      console.log('json파일을 읽지 못함')
    } else {
      messageData = JSON.parse(data)
      messageData.message.push({
        type: "user",
        message: newData,
        timestamp: timestamp
      })
      fs.writeFile(indexJsonDataPath, JSON.stringify(messageData, null, 2), (err) => {
        if (err) {
          console.error("error writing index.json", err);
          res.status(500).send("Internal Server Error")
        } else {
          
          console.log("index.json에 저장이 되었습니다.")
        }
      })

    }
  }

})

module.exports = {
  postMessageData: router.post('/savedata')
  
  // getMainpage: router.get('/')
}