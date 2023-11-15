// routes/routes.js
import express from 'express';
import fs, { readFile } from 'fs';

const router = express.Router();

router.get('/', (req, res) => {
  fs.readFile('../public/index.html')
});

router.post('/login', (req, res) => {
  // '/login' 경로에 대한 처리
});

export default router;