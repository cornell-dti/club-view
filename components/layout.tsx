import Head from "next/head";
import Navbar from "./navbar";

// TODO: implement using Base MUI: https://mui.com/base/getting-started/overview/

// currently setup to apply to every page
export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Head>
                <title>My page title</title>
            </Head>
            <Navbar />
            <main>{children}</main>
            // TODO: implement properly
        </>
    );
}
