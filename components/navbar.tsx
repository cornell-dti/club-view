import type { ReactElement } from "react";
import React from "react";
import Link from "next/link";
import {
    Backend_Routes,
    Frontend_Routes,
    Frontend_Dynamic_Base_Routes,
} from "../constants/routes";
import { toTitleCase } from "../utils/stringManipulation";
import { fetcher } from "../utils/fetcher";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { ClubType } from "../constants/types";

export default function Navbar(): ReactElement {
    const [dynamicRoutes, setDynamicRoutes] = React.useState<string[]>([]);
    React.useEffect(() => {
        getDynamicRoutes()
            .then((dynamicRoutes) => {
                setDynamicRoutes(dynamicRoutes);
            })
            .catch((err) => {
                console.log(err);
            });
    }),
        [];

    return <>Lol</>;
}

async function getDynamicRoutes(): Promise<string[]> {
    return new Promise<string[]>(async (resolve, reject) => {
        // Call an external API endpoint to get all club IDs.
        const clubs: ClubType[] = (await fetcher(
            "http://localhost:3000/api" + Backend_Routes.getAllClubs
        )) as ClubType[];

        // Build an array of dynamic routes.
        let dynamicRoutes: string[] = [];
        for (let club of clubs) {
            dynamicRoutes.push(Frontend_Dynamic_Base_Routes.club + club.name);
        }

        resolve(dynamicRoutes);
    });
}
