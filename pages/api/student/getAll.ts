import { NextApiRequest, NextApiResponse } from "next";
import { students, clubs, events } from "./consts";
import { ClubType, EventType, StudentType } from "../../../constants/types";
import { getDataFromPromises } from "../../../utils/firebaseUtils";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const studentsSnapshot = await students.get();
    const allStudents = studentsSnapshot.docs;
    const studentsArray: StudentType[] = [];

    for (const student of allStudents) {
        const studentData = student.data();
        const favoritesClubs = await getDataFromPromises(
            studentData,
            "favorites",
            "ClubType"
        );
        const managedClubs = await getDataFromPromises(
            studentData,
            "managed",
            "ClubType"
        );
        const eventsAttending = await getDataFromPromises(
            studentData,
            "events",
            "EventType"
        );

        const studentInstance: StudentType = {
            id: studentData.id,
            firstName: studentData.firstName,
            lastName: studentData.lastNsame,
            year: studentData.year,
            email: studentData.email,
            managed: managedClubs as ClubType[],
            favorites: favoritesClubs as ClubType[],
            events: eventsAttending as EventType[],
        };
        studentsArray.push(studentInstance);
    }
    res.status(200).send(studentsArray);
};
