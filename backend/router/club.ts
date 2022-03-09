
import express from 'express';
import { ClubType } from '../types/types';
import { db } from '../firebase-config/config';
import { createSolutionBuilderHost } from 'typescript';
import { domainToASCII } from 'url';

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

//Adds a club with req.body
router.post('/', async (req, res) => {
  const clubsCollection = await db.collection('clubs');
  const clubsDoc = clubsCollection.doc();
  console.log(req.body);
  const club: ClubType = req.body;
  await clubsDoc.set(club);
  res.send(club);
});

//Edits a club information
router.post('/', async (req, res) => {
  const clubID = req.body.id;
  const clubsCollection = db.collection('clubs');
  const doc = await clubsCollection.doc(clubID).get()
  if (!doc.exists) {
    throw new Error('Invalid id');
  } else {
    res.send(req.body);
    console.log("Club info has been updated");
  }
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

export default router;
