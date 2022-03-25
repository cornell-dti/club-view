import express from 'express';
import { ClubType, SocialType, URLs } from '../types/types';
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

//Adds a club with req.body
router.post('/', async (req, res) => {
  const clubsCollection = await db.collection('clubs');
  const clubsDoc = clubsCollection.doc(req.body.id);
  console.log(req.body);
  const club: ClubType = req.body;
  await clubsDoc.set(club);
  res.send(club);
});

//Adds a club's social links (platform is other for custom social medias)
router.post('/:id/socials/', async (req, res) => {
  const clubID = req.body.id;
  const clubDoc = db.collection('clubs').doc(clubID);
  const url = req.body.url;
  const platform = req.body.platform;
  if (req.body.userID != (await (await clubDoc.get()).get('registeredBy'))) {
    console.log('You are not authenticated');
  } else if (url.includes(URLs[platform])) {
    const doc = await clubDoc.get();
    if (!doc.exists) {
      console.log('INVALID CLUB: ' + clubID);
    } else {
      const socials = await doc.get('socials');
      socials.push({ platform: req.body.platform, url: req.body.url });
      await clubDoc.update({ socials: socials });
    }
  } else {
    console.log('URL not valid');
  }
  res.send(clubDoc);
});

router.get('/:id', async (req, res) => {
  const clubId = req.params.id;
  const clubsCollection = db.collection('clubs');
  const ref = clubsCollection.doc(clubId);
  const doc = await ref.get();
  if (!doc.exists) {
    console.log('INVALID ID ' + clubId);
  }
  const data = doc.data() as ClubType;
  res.send(data);
});

export default router;
