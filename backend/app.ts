import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
/*eslint-disable */
import { authMiddleware } from './router/auth';
import clubRoutes from './router/club';
import studentRoutes from './router/student';
/* eslint-enable */

config();

const app = express();

app.use(cors({ origin: true }));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// app.use('/', authMiddleware);
app.use('/clubs', clubRoutes);
app.use('/students', studentRoutes);

app.listen(3000, () => {
  console.log('Server listening on Port 3000');
});
