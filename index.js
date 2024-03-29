import express from 'express';
import path from 'path';

const PORT = 3000;

const app = express();

const dirname = path.dirname('./');

app.use('/', express.static(`${dirname}/dist`));
app.listen(PORT, () => {
  console.log(`Port ${PORT} listen...`);
});
