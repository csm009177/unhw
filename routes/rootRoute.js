// routes/rootRoute.js
import express from 'express';
import fs from 'fs';
import path from 'path';

const router = express.Router();
router.use(express.json());

router.get('/', (req, res) => {
  fs.readFile('public/index.html', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } else {
      res.send(data);
    }
  });
});

router.post('/api/data', (req, res) => {
  const { message } = req.body;

  // 기록을 저장할 파일 경로
  const filePath = path.join(__dirname, '../save.json');

  // 이전 기록 불러오기
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } else {
      let records = [];

      if (data) {
        records = JSON.parse(data);
      }

      // 새로운 기록 추가
      records.push({ user: 'user', message });

      // 새로운 기록을 파일에 저장
      fs.writeFile(filePath, JSON.stringify(records, null, 2), (err) => {
        if (err) {
          console.error(err);
          res.status(500).send('Internal Server Error');
        } else {
          res.json({ success: true });
        }
      });
    }
  });
});

export default router;