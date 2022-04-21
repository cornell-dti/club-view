import express from 'express';
import { ClubType, EventType } from '../types/types';
import { db } from '../firebase-config/config';
import { uploadImage } from '../../frontend/src/util/firebase';

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

//Edits a club's information
router.post('/edit/:id', async (req, res) => {
  const clubUpdated: ClubType = req.body;
  const clubID = req.body.id;
  const clubsCollection = db.collection('clubs');
  const ref = clubsCollection.doc(clubID);
  const doc = await ref.get();
  if (!doc.exists) {
    throw new Error('Invalid ID');
  }
  await ref.set(clubUpdated);
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

// Adds image to club
router.post('/:id/addimage', async (req, res) => {
  const clubID = req.params.id;
  const clubsCollection = db.collection('clubs');
  const ref = clubsCollection.doc(clubID);
  const doc = await ref.get();
  const imageURL = uploadImage;
  const imagesDoc = await doc.get('images');
  if (!imagesDoc.exists) {
    const updatedImages: string[] = [imageURL];
    await ref.update({ images: updatedImages });
  } else {
    const images: string[] = imagesDoc;
    const updatedImages = [...images, imageURL];
    await ref.update({ images: updatedImages });
  }
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
