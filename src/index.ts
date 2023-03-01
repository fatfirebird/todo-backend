import express from 'express';
import * as dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT ?? 3000;
console.log(process.env.NODE_ENV);

app.get('/', (e, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log('Example app listening on port ' + port);
});
