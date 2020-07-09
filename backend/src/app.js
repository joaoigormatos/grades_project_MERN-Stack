import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import { gradeRouter } from './routes/gradeRouter.js';




const app = express();

//define o dominio de origem para consumo do servico
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(
//   cors({
//     origin: 'http://localhost:8080',
//   })
// );
app.use(cors())
app.use(gradeRouter);

app.get('/', (req, res) => {
  res.send('API em execucao');
});




export default app;
