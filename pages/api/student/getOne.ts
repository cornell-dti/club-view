import { NextApiRequest, NextApiResponse } from "next";
import { students, clubs, events } from "./consts";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const id = req.body.id;
    const student = await (await students.doc(id).get()).data();
    if (!student) {
        res.status(404).send({ err: "Student not found" });
    } else {
        const favoritesClubs = await student.get(
            student,
            "favorites",
            "ClubType"
        );
        const managedClubs = await student.get(student, "managed", "ClubType");
        const eventsAttending = await student.get(
            student,
            "events",
            "EventType"
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
};
