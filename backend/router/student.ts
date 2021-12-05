import express from 'express';

const router = express.Router();

router.get('/user/all', (req, res) => {
  res.send('Getting all students...');
});

router.get('/user/{id}', (req, res) => {
  res.send('Getting student...');
});

export default router;
