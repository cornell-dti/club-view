import express from 'express';
import { ClubType, StudentType } from '../types/types';
import { db } from '../firebase-config/config';
import { firestore } from 'firebase-admin';

const router = express.Router();
const students = db.collection('students');
const clubs = db.collection('clubs');

/** getClubDataFromReference takes in a reference to a club and finds and returns its document */
const getClubDataFromReference = async (
  clubReference: firestore.DocumentReference
) => {
  const clubPromise = await clubReference.get();
  const clubData: ClubType = clubPromise.data() as ClubType;
  return clubData;
};
/** getClubsFromReference returns a list of clubs corresponding to typeOfClub. This can be either the student's favorited clubs, or their managed clubs */
const getClubsFromReference = async (student, typeOfClub) => {
  const clubListRaw: firestore.DocumentReference[] = student[typeOfClub];
  const clubListPromises = clubListRaw.map((clubReference) => {
    return getClubDataFromReference(clubReference);
  });
  const clubList = await Promise.all(clubListPromises).then((clubArray) => {
    return clubArray;
  });
  return clubList;
};

// Get All Students
router.get('/', async (_, res) => {
  const studentsSnapshot = await students.get();
  const allStudents = studentsSnapshot.docs;
  const studentsArray: StudentType[] = [];
  for (const student of allStudents) {
    const studentData = student.data();
    const favoritesClubs = await getClubsFromReference(
      studentData,
      'favorites'
    );
    const managedClubs = await getClubsFromReference(studentData, 'managed');

    const studentInstance: StudentType = {
      id: studentData.id,
      firstName: studentData.firstName,
      lastName: studentData.lastNsame,
      year: studentData.year,
      email: studentData.email,
      managed: managedClubs,
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
    const favoritesClubs = await getClubsFromReference(
      student.data(),
      'favorites'
    );
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

export default router;
