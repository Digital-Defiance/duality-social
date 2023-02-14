import express from 'express';
import compression from 'compression';

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const app = express();
const _app_folder = 'dist/packages/duality-social-angular/';

app.use(compression());

app.use(express.static(_app_folder, { index: ['index.html'] }));

app.get('/api', (req, res) => {
  res.send({ message: 'Hello API' });
});

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});
