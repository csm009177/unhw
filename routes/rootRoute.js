// routes/routes.js
import express from 'express';
import fs, { readFile } from 'fs';

const router = express.Router();

router.get('/', (req, res) => {
  fs.readFile('../public/index.html', "utf8")
});

router.post('/saveData', (req, res) => {
  fs.writeFile('../public/index.json')
});

export default router;

