// app.js
import express from 'express';
import rootRoute from './routes/rootRoute.js';

const app = express();
const port = 3217;

app.use(express.static('public'));
app.use(rootRoute);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});