import express from 'express';
import { ClubType, SocialType, URLs } from '../types/types';
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

//Edits a club's information
router.post('/edit/:id', async (req, res) => {
  const clubUpdated: ClubType = req.body;
  const clubID = req.body.id;
  const clubsCollection = db.collection('clubs');
  const clubDoc = clubsCollection.doc(clubID);
  const doc = await clubDoc.get();
  if (!doc.exists) {
    throw new Error('Invalid ID');
  }
  await clubDoc.set(clubUpdated);
  res.send(doc);
});

//Adds a club's social links (platform is other for custom social medias)
router.post('/:id/socials/', async (req, res) => {
  const clubID = req.body.id;
  const clubDoc = db.collection('clubs').doc(clubID);
  if (req.params.id == clubDoc['registeredBy']) {
    throw new Error('You are not authenticated');
  }
  const url = req.body.toLowerCase();
  const platform = req.body.toLowerCase();
  if (url.includes(URLs[platform])) {
    const doc = await clubDoc.get();
    if (!doc.exists) {
      throw new Error('Invalid ID');
    } else {
      const socials = await doc.get('socials');
      socials.push({ platform: req.body.platform, url: req.body.url });
      await clubDoc.update({ socials: socials });
    }
    res.send(clubDoc);
  } else {
    throw new Error('URL not valid');
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
