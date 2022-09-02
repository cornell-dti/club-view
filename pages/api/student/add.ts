import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../index";
import { StudentType } from "../../../constants/types";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const body = req.body;
    const sid = body.uid;
    const studentCollection = db.collection("students");
    const snapshot = await studentCollection.where("id", "==", sid).get();

    if (snapshot.empty) {
        const displayName: string = body.displayName;
        const first = displayName.split(" ")[0];
        const last = displayName.split(" ")[1];

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
        console.log("Student with that uid does not exist. Added.");
        res.send(newStudent);
    } else {
        console.log("Student with that uid already exists.");
        res.send(snapshot.docs[0].data());
    }
};
