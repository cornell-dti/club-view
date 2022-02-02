import express from 'express';
import db from '../firebase-config/config';

const router = express.Router();

type Club = {
  name: string;
};

//Gets all club infrormation
router.get('/', async (req, res) => {
  const clubsCollection = db.collection('clubs');
  const clubsSnapshot = await clubsCollection.get();
  const allClubs = clubsSnapshot.docs;
  const clubs: Club[] = [];
  for (let doc of allClubs) {
    const post: Club = doc.data() as Club;
    clubs.push(post);
  }
  res.send(clubs);
});

export default router;
