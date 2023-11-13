import express from 'express';
import fs from 'fs';
const app = express();
const port = 3000;

app.use(express.static('static'));

app.use(express.json());

app.post('/recordSearch', (req, res) => {
    const searchTerm = req.body.searchTerm;
    const currentDate = new Date().toLocaleString();

    // JSON 파일에 검색어 추가
    const searchData = { term: searchTerm, date: currentDate };
    const currentData = JSON.parse(fs.readFileSync('searchData.json', 'utf-8') || '[]');
    currentData.push(searchData);
    fs.writeFileSync('searchData.json', JSON.stringify(currentData, null, 2));

    res.send('Search term recorded successfully.');
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

