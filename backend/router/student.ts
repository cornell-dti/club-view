import express from 'express';

const router = express.Router();

router.get('/getUser/all', (req, res) => {
  res.send("Getting all students...")
}); 

router.get('/getUser/{id}', (req, res) => {
  res.send("Getting student...")
}); 

export default router;
