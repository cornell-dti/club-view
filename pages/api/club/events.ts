import { NextApiRequest, NextApiResponse } from "next";
import { db, storage, auth } from "../index";
import { ClubType } from "../../../constants/types";
import { EventType } from "../../../constants/types";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method == "GET") {
        /** Returns the events of a club
         * @params takes in only clubID
         * {id : ClubID}
         */
        const clubID = req.body.id;
        const clubsCollection = db.collection("clubs");
        const ref = clubsCollection.doc(clubID);
        const doc = await ref.get();
        const events: EventType[] = await doc.get("events");
        res.send(events);
    } else if (req.method == "POST") {
        /** Adds an event to a club
         * @params {
         *    id: ClubID
         *    event: EventType
         * }
         */
        const clubID = req.body.id;
        const clubsCollection = db.collection("clubs");
        const ref = clubsCollection.doc(clubID);
        const doc = await ref.get();
        const events: EventType[] = await doc.get("events");
        const event: EventType = req.body;
        const updated_events = [...events, event];
        res.send(updated_events);
        await ref.update({ events: updated_events });
        res.send(ref);
    }
};
