import express from 'express';
import { ClubType } from '../types/types';
import { db } from '../firebase-config/config';
import { createSolutionBuilderHost } from 'typescript';

const router = express.Router();

//Gets all club infrormation
router.get('/', async (req, res) => {
  const clubsCollection = db.collection('clubs');
  const clubsSnapshot = await clubsCollection.get();
  const allClubs = clubsSnapshot.docs;
  const clubs: ClubType[] = [];
  for (let doc of allClubs) {
    const club: ClubType = doc.data() as ClubType;
    clubs.push(club);
  }
  res.send(clubs);
});

router.get('/:id', async (req, res) => {
  const clubId = req.params.id;
  const clubsCollection = db.collection('clubs');
  const ref = clubsCollection.doc(clubId);
  const doc = await ref.get();
  if (!doc.exists) {
    throw new Error('Invalid id');
  }
  const data = doc.data() as ClubType;
  res.send(data);
});

router.post('/', async (req, res) => {
  const clubsCollection = await db.collection('clubs').get();
  const clubsDoc = clubsCollection.docs
  const club: ClubType = {
    id: req.body.id,
    name: req.body.name,
    category: req.body.category,
    email: req.body.email,
    description: req.body.description,
    url: req.body.url,
    status: req.body.status,
    openDate: req.body.openDate,
    closeDate: req.body.closeDate,
    registeredBy: req.body.registeredBy
  };
  clubsDoc.push(club);
});

export default router;
