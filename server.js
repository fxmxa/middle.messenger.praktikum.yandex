import express from 'express';
import path from 'path';

const __dirname = path.resolve();

const PORT = process.env.PORT || 3000;

const app = express();

const dirname = path.dirname('./');

app.use('/', express.static(`${dirname}/dist`));
app.use('*', (req, res) => {
  res.sendFile(`${__dirname}/dist/index.html`);
});

app.listen(PORT, () => {
  console.log(`Port ${PORT} listen...`);
});
