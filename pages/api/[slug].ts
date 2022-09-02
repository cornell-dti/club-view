// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// TODO: move clubview backend routes here, referencing constants/routes
// Keep typing in mind: https://nextjs.org/docs/basic-features/typescript#api-routes

/** For dynamic routing in the future if we want to work with params instead of body
 */
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    res.send(":)");
};
