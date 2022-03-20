import express from 'express';
import { ClubType, StudentType } from '../types/types';
import db from '../firebase-config/config';
import { firestore } from 'firebase-admin';
import { textSpanIntersection } from 'typescript';

const router = express.Router();
const students = db.collection('students');
const clubs = db.collection('clubs');

const clubsToString = (clubs) => {
  const clubNameArray: ClubType[] = [];
  clubs.forEach((club) => {
    clubNameArray.push(club);
  });
  return clubNameArray;
};
const getClubDataFromReference = async (
  clubReference: firestore.DocumentReference
) => {
  const clubPromise = await clubReference.get();
  const clubData: ClubType = clubPromise.data() as ClubType;
  return clubData;
};

const getFavorites = async (student) => {
  const favorites: firestore.DocumentReference[] = student.favorites;
  const favoritesClubPromises = favorites.map((clubReference) => {
    return getClubDataFromReference(clubReference);
  });
  const favoritesClubs = await Promise.all(favoritesClubPromises).then(
    (clubArray) => {
      return clubArray;
    }
  );
  return favoritesClubs;
};
// Get All Students
router.get('/', async (req, res) => {
  const studentsSnapshot = await students.get();
  const allStudents = studentsSnapshot.docs;
  const studentsArray: StudentType[] = [];
  for (const student of allStudents) {
    const studentData = student.data();
    const favoritesClubs = await getFavorites(studentData);

    const studentInstance: StudentType = {
      id: studentData.id,
      firstName: studentData.firstName,
      lastName: studentData.lastNsame,
      year: studentData.year,
      email: studentData.email,
      managed: clubsToString(studentData.managed),
      favorites: favoritesClubs,
    };
    studentsArray.push(studentInstance);
  }
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
    const favoritesClubs = await getFavorites(student.data());
    console.log(favoritesClubs);
    res.status(200).send(favoritesClubs);
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
