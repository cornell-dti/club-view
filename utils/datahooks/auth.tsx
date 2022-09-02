import useSWR from "swr";
import { fetcher } from "../fetcher";

export function hitEndpoint(route: string) {
    const { data, error } = useSWR(
        `${process.env.NEXT_PUBLIC_BASE_URL}/${route}`,
        fetcher
    );

    return {
        user: data,
        isLoading: !error && !data,
        isError: error,
    };
}

// TODO: use like this (https://swr.vercel.app/docs/getting-started#make-it-reusable)

export function hitQuery(route: string, query: string) {
    const { data, error } = useSWR(
        `${process.env.NEXT_PUBLIC_BASE_URL}/${route}?=${query}`,
        fetcher
    );

    return {
        user: data,
        isLoading: !error && !data,
        isError: error,
    };
}

// usage: etc etc
