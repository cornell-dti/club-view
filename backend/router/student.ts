import express from 'express';
import { ClubType, StudentType } from '../types/types';
import db from '../firebase-config/config';

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
    const favorites = await student.get('favorites');
    const favoritesArray: ClubType[] = [];
    favorites.forEach((fav) => {
      console.log(fav);
      favoritesArray.push(fav);
      res.status(200).send(fav);
    });
  }
});

export default router;
