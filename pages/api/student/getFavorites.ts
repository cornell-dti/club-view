import { NextApiRequest, NextApiResponse } from "next";
import { students, clubs } from "./consts";
import { db } from "../index";
import { getDataFromPromises } from "../../../utils/firebaseUtils";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method == "GET") {
        const id = req.body.id;
        const studentDoc = students.doc(id);
        const student = await studentDoc.get();
        if (!student.exists) {
            res.status(404).send({ err: "Student not found" });
        } else {
            //TODO: rewrite getter for favorite clubs
            const favoritesClubs = await getDataFromPromises(
                student.data()!,
                "favorites",
                "ClubType"
            );
            res.status(200).send(favoritesClubs);
        }
    } else if (req.method == "POST") {
        /** adds a new club to students favourites list */
        const sid = req.body.sid;
        const cid = req.body.cid;
        const studentDoc = students.doc(sid);
        const student = await studentDoc.get();
        const clubDoc = clubs.doc(cid);
        const club = await clubDoc.get();
        const clubReference = db.doc(`/clubs/${cid}`);
        if (!student.exists) {
            res.status(404).send({ err: "Student not found" });
        } else if (!club.exists) {
            res.status(404).send({ err: "Club not found" });
        } else {
            const favorites = await student.get("favorites");
            const updatedFavorites = [...favorites, clubReference];
            await studentDoc.update({ favorites: updatedFavorites });
            res.status(200).send(club.get("name"));
        }
    }
};
