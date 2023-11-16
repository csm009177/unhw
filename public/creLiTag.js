// routes/rootRoute.js
import express from 'express';
import fs from 'fs';

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

export default router;