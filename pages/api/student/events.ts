import { NextApiRequest, NextApiResponse } from "next";
import { students, clubs, events } from "./consts";
import { StudentType } from "../../../constants/types";
import { db } from "..";
import { getDataFromPromises } from "../../../utils/firebaseUtils";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method == "GET") {
        const id = req.body.id;
        const studentDoc = students.doc(id);
        const student = await studentDoc.get();
        if (!student.exists) {
            res.status(404).send({ err: "Student not found" });
        } else {
            const eventsAttending = await getDataFromPromises(
                student.data()!,
                "events",
                "EventType"
            );
            res.status(200).send(eventsAttending);
        }
    } else if (req.method == "POST") {
        /** Updates students events with eid */
        const sid = req.body.sid;
        const eid = req.body.eid;
        const studentDoc = students.doc(sid);
        const student = await studentDoc.get();
        const eventDoc = events.doc(eid);
        const event = await eventDoc.get();
        const clubReference = db.doc(`/events/${eid}`);
        if (!student.exists) {
            res.status(404).send({ err: "Student not found" });
        } else if (!event.exists) {
            res.status(404).send({ err: "Event not found" });
        } else {
            const events = await student.get("events");
            const updatedEvents = [...events, clubReference];
            await studentDoc.update({ events: updatedEvents });
            res.status(200).send(event.get("title"));
        }
    }
};
