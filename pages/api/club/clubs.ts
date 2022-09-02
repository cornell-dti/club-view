// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// Keep typing in mind: https://nextjs.org/docs/basic-features/typescript#api-routes
import { NextApiRequest, NextApiResponse } from "next";
import { db, storage, auth } from "../index";
import { ClubType } from "../../../constants/types";

const clubsCollection = db.collection("clubs");

/** These functions deal primarally with clubs in the clubs collection */
export default async (req: NextApiRequest, res: NextApiResponse) => {
    /** Returns all clubs in database */
    if (req.method == "GET") {
        const clubsSnapshot = await clubsCollection.get();
        const allClubs = clubsSnapshot.docs;
        const clubs: ClubType[] = [];
        for (const doc of allClubs) {
            const club: ClubType = doc.data() as ClubType;
            clubs.push(club);
        }
        res.send(clubs);
    } else if (req.method == "POST") {
        /** Adds a club into the clubs collection */
        const clubsDoc = clubsCollection.doc(req.body.id);
        const club: ClubType = req.body;
        await clubsDoc.set(club);
        res.send(club);
    }
};
