import express from 'express';
import { ClubType, EventType, URLs } from '../types/types';
import { db } from '../firebase-config/config';

const router = express.Router();

//Gets all club infrormation
router.get('/', async (req, res) => {
  const clubsCollection = db.collection('clubs');
  const clubsSnapshot = await clubsCollection.get();
  const allClubs = clubsSnapshot.docs;
  const clubs: ClubType[] = [];
  for (const doc of allClubs) {
    const club: ClubType = doc.data() as ClubType;
    clubs.push(club);
  }
  res.send(clubs);
});

//Adds a club with req.body
router.post('/', async (req, res) => {
  const clubsCollection = await db.collection('clubs');
  const clubsDoc = clubsCollection.doc(req.body.id);
  const club: ClubType = req.body;
  await clubsDoc.set(club);
  res.send(club);
});

//Adds a club's social links (platform is other for custom social medias)
router.post('/:id/socials/', async (req, res) => {
  const clubID = req.params.id;
  const clubDoc = db.collection('clubs').doc(clubID);
  const url = req.body.url;
  const platform = req.body.platform;
  const doc = await clubDoc.get();
  if (req.body.id != (await doc.get('registeredBy').id)) {
    console.log('You are not authenticated');
  } else if (url.includes(URLs[platform])) {
    if (!doc.exists) {
      console.log('INVALID CLUB: ' + clubID);
    } else {
      const socialsList = await doc.get('socials');
      const socialsBody = {
        platform: req.body.platform,
        url: req.body.url,
      };
      socialsList.push(socialsBody);
      await clubDoc.update({ socials: socialsList });
    }
  } else {
    console.log('URL not valid');
  }
  res.send(clubDoc);
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

// Get club events
router.get('/:id', async (req, res) => {
  const clubID = req.params.id;
  const clubsCollection = db.collection('clubs');
  const ref = clubsCollection.doc(clubID);
  const doc = await ref.get();
  const events: EventType[] = await doc.get('events');
  res.send(events);
});

// Adds event to club
router.post('/:id', async (req, res) => {
  const clubID = req.params.id;
  const clubsCollection = db.collection('clubs');
  const ref = clubsCollection.doc(clubID);
  const doc = await ref.get();
  const events: EventType[] = await doc.get('events');
  const event: EventType = req.body;
  const updated_events = [...events, event];
  res.send(updated_events);
  await ref.update({ events: updated_events });
  res.send(ref);
});

router.get('/:id', async (req, res) => {
  const clubId = req.params.id;
  const clubsCollection = db.collection('clubs');
  const ref = clubsCollection.doc(clubId);
  const doc = await ref.get();
  if (!doc.exists) {
    // throw new Error('Invalid id'); // bit dramatic to crash the whole backend over a bad id, no?
    console.log('INVALID ID: ' + clubId);
  }
  const data = doc.data() as ClubType;
  res.send(data);
});

export default router;
