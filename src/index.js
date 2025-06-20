import express from 'express';
// import routes from './controller/control';
// import frontend from './controller/url.control.js';
import frontend from './api/controller/url.control.js';
import bodyParser from 'body-parser';
import {port} from './api/dotenv/dotenv.js';
import path from 'path'
import cors from 'cors'
const app = express();
const ports = 8080 || port;

app.use(express.json());
app.use(bodyParser.json());
app.use(express.static(path.resolve('./')+'/src/front-end/'));
// console.log(path.resolve('./')+'/src');

app.set('view engine','ejs');
app.use(
  cors({
    allowedHeaders: [
      'Origin',
      'X-Requested-With',
      'Content-Type',
      'Accept',
      'X-Access-Token',
      'Authorization',
      'Access-Control-Allow-Origin',
      'Access-Control-Allow-Headers',
      'Access-Control-Allow-Methods',

    ],
    methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
    preflightContinue: true,
    origin: '*',
  })
);
// app.use(express.static(path.join(__dirname, '../src')));
app.get('/', async (req, res) => {
  res.sendFile(path.resolve('./')+'/src/front-end/index.html');
  // res.sendFile(path.join('./front-end/index.html'));
});

frontend(app);

app.listen(ports, () => {
  console.log(`Your server starting on --> http://localhost:${ports}`);
});
/*for start writ (npm run dev)*/
export default app;
