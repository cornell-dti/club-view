import express from 'express';
import { ClubType, StudentType } from '../types/types';
import {db} from '../firebase-config/config';

const router = express.Router();
const students = db.collection('students');
const clubs = db.collection('clubs');

// Get All Students
router.get('/', async (req, res) => {
  const studentsSnapshot = await students.get();
  const allStudents = studentsSnapshot.docs;
  const studentsArray: StudentType[] = [];
  allStudents.forEach((doc) => {
    const student: StudentType = doc.data() as StudentType;
    studentsArray.push(student);
  });
  res.status(200).send(studentsArray);
});

// Get Student by ID
router.get('/:id', async (req, res) => {
  const id = req.params.id;
  const student = await students.doc(id).get();
  if (!student.exists) {
    res.status(404).send({ err: 'Student not found' });
  } else {
    const data: StudentType = student.data() as StudentType;
    res.status(200).send(data);
  }
});
// Get Favorite Clubs of Student
router.get('/:id/favorites', async (req, res) => {
  const id = req.params.id;
  const studentDoc = students.doc(id);
  const student = await studentDoc.get();
  if (!student.exists) {
    res.status(404).send({ err: 'Student not found' });
  } else {
    const favorites = await studentDoc.collection('favorites').get();
    const favoritesArray: ClubType[] = [];
    favorites.forEach((fav) => {
      const favorite = fav.data() as ClubType;
      favoritesArray.push(favorite);
      res.status(200).send(favoritesArray);
    });
  }
});
// Update a Student's favorites list with club {cid} added
router.put('/:sid/favorites/:cid', async (req, res) => {
  const sid = req.params.sid;
  const cid = req.params.cid;
  const studentDoc = students.doc(sid);
  const student = await studentDoc.get();
  const clubDoc = clubs.doc(cid);
  const club = await clubDoc.get();
  if (!student.exists) {
    res.status(404).send({ err: 'Student not found' });
  } else if (!club.exists) {
    res.status(404).send({ err: 'Club not found' });
  } else {
    const favorites = await student.get('favorites');
    const updatedFavorites = [...favorites, club.get('name')];
    await studentDoc.update({ favorites: updatedFavorites });
    res.status(200).send(club.get('name'));
  }
});

export default router;
