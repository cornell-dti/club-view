export type RoutesType = {
    [key: string]: string;
};

// TODO: will need to modify this along with our implementation of the api
export const Backend_Routes: RoutesType = {
    getAllClubs: "/club/getAll", // get all clubs (IDs)
};

// Maintenance TODO: keep updated with pages folder
export const Frontend_Routes: RoutesType = {
    home: "/",
    register: "/register",
};

// Maintenance TODO: keep updated with pages folder
export const Frontend_Dynamic_Base_Routes: RoutesType = {
    club: "/clubs/",
};
