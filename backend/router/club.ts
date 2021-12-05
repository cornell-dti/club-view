import express from 'express';

const router = express.Router();

router.get('/club/all', (req, res) => {
  res.send('Getting all clubs...');
});

router.get('/club/{id}', (req, res) => {
  res.send('Getting club...');
});

export default router;
