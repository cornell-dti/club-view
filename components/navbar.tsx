import type { ReactElement } from "react";
import React from "react";
import Link from "next/link";
import Box from '@mui/material/Box';
import {
    createStyles,
    fade, 
    Theme, 
    makeStyles
} from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search'
import InputBase from '@material-ui/core/InputBase'
import {
    Backend_Routes,
    Frontend_Routes,
    Frontend_Dynamic_Base_Routes,
} from "../constants/routes";
import { toTitleCase } from "../utils/stringManipulation";
import { fetcher } from "../utils/fetcher";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { ClubType } from "../constants/types";
import Button from "@mui/material/Button";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        search: {
            display: 'flex',
            flexDirection: 'row',
            position: 'relative',
            borderRadius: theme.shape.borderRadius,
            backgroundColor: '#F5F5F5', // white smoke
            '&:hover': {
                backgroundColor: '#D3D3D3', // light gray,
            },
            marginLeft: 0,
            width: '100%',
            minWidth: '12rem',
            [theme.breakpoints.up('sm')]: {
                marginLeft: theme.spacing(1),
                width: 'auto',
            },
        },
        searchIcon: {
            padding: theme.spacing(0, 2),
            height: '100%',
            position: 'absolute',
            pointerEvents: 'none',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
        },
        inputRoot: {
            color: 'inherit',
            display: 'flex',
            flexDirection: 'row',
        },
        inputInput: {
            display: 'flex',
            flexDirection: 'row',
            padding: theme.spacing(1, 1, 1, 0),
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                width: '12ch',
                '&:focus': {
                    width: '20ch',
                },
            },
        },
        rightButtons: {
            display: 'flex',
            width: '17rem',
            justifyContent: 'space-between',
        },
    })
);
export default function Navbar(): ReactElement {
    const [dynamicRoutes, setDynamicRoutes] = React.useState<string[]>([]);
    const classes = useStyles();
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

    return (
        <Box 
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                margin: '1.5rem 1.5rem',
                alignItems: 'center',
            }}
        >
            <Link href="/">
                <img src={"/logo.svg"} alt="Logo of ClubView" />
            </Link>

            <div className={classes.search}>
                <div className={classes.searchIcon}>
                    <SearchIcon />
                </div>
                <InputBase
                    placeholder="Search..."
                    classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                    }}
                    inputProps={{ 'aria-label': 'search ' }}
                />
            </div>

            <div className={classes.rightButtons}>
                <Button 
                    variant="outlined"
                    href="/register"
                    color="primary"
                >
                    Register Club
                </Button>

                <Button 
                    variant="contained"
                    color="primary"
                >
                    Profile
                </Button>
            </div>
        </Box>
    )
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
