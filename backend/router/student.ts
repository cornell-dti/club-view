import express from 'express';
import { StudentType } from '../types/types';
import { db } from '../firebase-config/config';
import { firestore } from 'firebase-admin';
import { getDataFromPromises } from '../util/common';

const router = express.Router();
const students = db.collection('students');
const clubs = db.collection('clubs');
const events = db.collection('events');

/** Get All Students */
router.get('/', async (_, res) => {
  const studentsSnapshot = await students.get();
  const allStudents = studentsSnapshot.docs;
  const studentsArray: StudentType[] = [];

  for (const student of allStudents) {
    const studentData = student.data();
    const favoritesClubs = await getDataFromPromises(
      studentData,
      'favorites',
      'ClubType'
    );
    const managedClubs = await getDataFromPromises(
      studentData,
      'managed',
      'ClubType'
    );
    const eventsAttending = await getDataFromPromises(
      studentData,
      'events',
      'EventType'
    );

    const studentInstance: StudentType = {
      id: studentData.id,
      firstName: studentData.firstName,
      lastName: studentData.lastNsame,
      year: studentData.year,
      email: studentData.email,
      managed: managedClubs,
      favorites: favoritesClubs,
      events: eventsAttending,
    };
    studentsArray.push(studentInstance);
  }
  res.status(200).send(studentsArray);
});

/** Get Student by ID */
router.get('/:id', async (req, res) => {
  const id = req.params.id;
  const student = await (await students.doc(id).get()).data();
  if (!student) {
    res.status(404).send({ err: 'Student not found' });
  } else {
    const favoritesClubs = await getDataFromPromises(
      student,
      'favorites',
      'ClubType'
    );
    const managedClubs = await getDataFromPromises(
      student,
      'managed',
      'ClubType'
    );
    const eventsAttending = await getDataFromPromises(
      student,
      'events',
      'EventType'
    );
    const studentInstance = {
      id: student.id,
      firstName: student.firstName,
      lastName: student.lastName,
      year: student.year,
      email: student.email,
      managed: managedClubs,
      favorites: favoritesClubs,
      events: eventsAttending,
    };
    res.status(200).send(studentInstance);
  }
});
/** Get Favorite Clubs of Student */
router.get('/:id/favorites', async (req, res) => {
  const id = req.params.id;
  const studentDoc = students.doc(id);
  const student = await studentDoc.get();
  if (!student.exists) {
    res.status(404).send({ err: 'Student not found' });
  } else {
    const favoritesClubs = await getDataFromPromises(
      student.data(),
      'favorites',
      'ClubType'
    );
    res.status(200).send(favoritesClubs);
  }
});
/** Update a Student's favorites list with club {cid} added */
router.put('/:sid/favorites/:cid', async (req, res) => {
  const sid = req.params.sid;
  const cid = req.params.cid;
  const studentDoc = students.doc(sid);
  const student = await studentDoc.get();
  const clubDoc = clubs.doc(cid);
  const club = await clubDoc.get();
  const clubReference = firestore().doc(`/clubs/${cid}`);
  if (!student.exists) {
    res.status(404).send({ err: 'Student not found' });
  } else if (!club.exists) {
    res.status(404).send({ err: 'Club not found' });
  } else {
    const favorites = await student.get('favorites');
    const updatedFavorites = [...favorites, clubReference];
    await studentDoc.update({ favorites: updatedFavorites });
    res.status(200).send(club.get('name'));
  }
});

/** Get Events Attended by student {sid} */
router.get('/:id/events', async (req, res) => {
  const id = req.params.id;
  const studentDoc = students.doc(id);
  const student = await studentDoc.get();
  if (!student.exists) {
    res.status(404).send({ err: 'Student not found' });
  } else {
    const eventsAttending = await getDataFromPromises(
      student.data(),
      'events',
      'EventType'
    );
    res.status(200).send(eventsAttending);
  }
});

/** Update a Student's events field with event {eid} added */
router.put('/:sid/events/:eid', async (req, res) => {
  const sid = req.params.sid;
  const eid = req.params.eid;
  const studentDoc = students.doc(sid);
  const student = await studentDoc.get();
  const eventDoc = events.doc(eid);
  const event = await eventDoc.get();
  const clubReference = firestore().doc(`/events/${eid}`);
  if (!student.exists) {
    res.status(404).send({ err: 'Student not found' });
  } else if (!event.exists) {
    res.status(404).send({ err: 'Event not found' });
  } else {
    const events = await student.get('events');
    const updatedEvents = [...events, clubReference];
    await studentDoc.update({ events: updatedEvents });
    res.status(200).send(event.get('title'));
  }
});

//makes new user/student object from user object passed in.
router.post('/register', async (req, res) => {
  const body = req.body;
  const sid = body.uid;
  const studentCollection = db.collection('students');
  const snapshot = await studentCollection.where('id', '==', sid).get();

  if (snapshot.empty) {
    const displayName: string = body.displayName;
    const first = displayName.split(' ')[0];
    const last = displayName.split(' ')[1];

    const newStudent: StudentType = {
      id: sid,
      firstName: first,
      lastName: last,
      email: body.email,
      managed: [],
      favorites: [],
      events: [],
    };

    await studentCollection.doc().set(newStudent);
    console.log('Student with that uid does not exist. Added.');
    res.send(newStudent);
  } else {
    console.log('Student with that uid already exists.');
    res.send(snapshot.docs[0].data());
  }
});

export default router;
