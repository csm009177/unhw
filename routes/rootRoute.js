// routes/routes.js
import express from 'express';
import fs, { readFile } from 'fs';

const router = express.Router();
router.use(express.json()); // Parse JSON data in request body

router.get('/', (req, res) => {
  fs.readFile('../public/index.html', "utf8")
});


router.post('/save', (req, res) => {
  const message = req.body.message;

  if (message.trim() !== "") {
    // 저장할 데이터를 JSON 파일에 추가
    fs.appendFileSync('../public/index.json', JSON.stringify({ user: message }) + '\n');

    res.status(200).json({ message: 'Data saved successfully' });
  } else {
    res.status(400).json({ error: 'Invalid data' });
  }
});

export default router;

