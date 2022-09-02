import "../styles/globals.scss";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import Layout from "../components/layout";

type Props = NextPage & AppProps;

export default function MyApp({ Component, pageProps }: Props) {
    return (
        <Layout>
            <Component {...pageProps} />
        </Layout>
    );
}
