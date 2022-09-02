import { NextApiRequest, NextApiResponse } from "next";
import { db, storage, auth } from "../index";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method == "GET") {
        // TODO: Write getter for social media links
        console.log("Write getter for social media links");
    } else if (req.method == "POST") {
        /** Adds a social media link to a club
         * @params Takes in a req.body that has
         * {
         *    id: userID
         *    clubID: clubID
         *    platform: Social Media platform (see URLs in "../../types")
         *    url: Social media link to the club
         * }
         */
        const clubID = req.body.clubID;
        const clubDoc = db.collection("clubs").doc(clubID);
        const url = req.body.url;
        const platform: string = req.body.platform;
        const doc = await clubDoc.get();
        if (req.body.id != (await doc.get("registeredBy").id)) {
            console.log("You are not authenticated");
        } else if (url.includes(platform + ".")) {
            // TODO: figure out url verification in the if statement
            if (!doc.exists) {
                console.log("INVALID CLUB: " + clubID);
            } else {
                const socialsList = await doc.get("socials");
                const socialsBody = {
                    platform: req.body.platform,
                    url: req.body.url,
                };
                socialsList.push(socialsBody);
                await clubDoc.update({ socials: socialsList });
            }
        } else {
            console.log("URL not valid");
        }
        res.send(clubDoc);
    }
};
