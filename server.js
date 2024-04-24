import express from 'express';
import path from 'path';

const PORT = process.env.PORT || 3000;

const app = express();

const dirname = path.dirname('./');

app.use('/messenger', express.static(`${dirname}/dist`));
app.listen(PORT, () => {
  console.log(`Port ${PORT} listen...`);
});
