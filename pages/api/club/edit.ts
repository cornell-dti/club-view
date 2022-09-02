import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../index";
import { ClubType } from "../../../constants/types";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method == "GET") {
        /** Returns one club's information
         * @params {id:ClubID}
         */
        const clubId = req.body.id;
        const clubsCollection = db.collection("clubs");
        const ref = clubsCollection.doc(clubId);
        const doc = await ref.get();
        if (!doc.exists) {
            console.log("INVALID ID: " + clubId);
        }
        const data = doc.data() as ClubType;
        res.send(data);
    } else if (req.method == "POST") {
        /** Updates the entire file for a club  */
        const clubUpdated: ClubType = req.body;
        const clubID = req.body.id;
        const clubsCollection = db.collection("clubs");
        const clubDoc = clubsCollection.doc(clubID);
        const doc = await clubDoc.get();
        if (!doc.exists) {
            throw new Error("Invalid ID");
        }
        // TODO: this next line update the entire club file, is it possible
        // to only update the fields provided?
        await clubDoc.set(clubUpdated);
        res.send(doc);
    }
};
