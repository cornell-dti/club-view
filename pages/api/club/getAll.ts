import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../index";
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
    }
};
