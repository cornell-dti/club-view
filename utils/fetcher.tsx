export const fetcher = async (url: string) => {
    return new Promise((resolve, reject) => {
        fetch(url).then((res) => {
            resolve(res.json());
        });
    });
};
