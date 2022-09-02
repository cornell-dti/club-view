import type { ReactElement } from "react";
import { useRouter, NextRouter } from "next/router";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { Backend_Routes } from "../../constants/routes";
import { fetcher } from "../../utils/fetcher";

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

export default function ClubInfo({ clubInfo }: Props): ReactElement {
    const router = useRouter();

    return (
        <div>
            <h1>Club info for club number: {router.pathname}</h1>
            <p>Name: {clubInfo.name}</p>
        </div>
    );
}

// See how this is implemented here: https://nextjs.org/docs/basic-features/data-fetching/get-server-side-props
// This could also use some incremental static regeneration: https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration
export const getServerSideProps: GetServerSideProps = async (context) => {
    // Call an external API endpoint to get club info
    const res = await fetcher(Backend_Routes.clubs);
    const clubInfo = await res.json();

    return {
        props: clubInfo, // will be passed to the page component as props
    };
};
