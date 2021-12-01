import express from 'express';
import cors from 'cors';
import {config} from 'dotenv';
import clubRoutes from './router/club';
import studentRoutes from './router/student';

config();

const app = express();

app.use(cors({ origin: true }));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/club', clubRoutes);
app.use('/student', studentRoutes);

app.listen(3000, () => {
  console.log('Server listening on Port 3000');
});
