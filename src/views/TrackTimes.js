import { Button, Container, TextField, Grid, CircularProgress, Typography } from "@material-ui/core";
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useEffect, useState } from 'react';
import Helmet from 'react-helmet';
import { useRouteMatch, Switch, Route, Link } from 'react-router-dom';
import { useHistory } from "react-router";
import TrackLeaderboard from "../components/TrackLeaderboard";

export default function TrackTimes() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isError, setIsError] = useState(false);
    const [trackLBs, setTrackLBs] = useState([]);

    let match = useRouteMatch();
    let history = useHistory();

    useEffect(() => {
        fetch("https://mta.leguaan.ee/iguana_points/tracktimes.json")
        .then(res => res.json())
        .then(
            (result) => {
                setTrackLBs(result);
                setIsLoaded(true);
            },
            (error) => {
                console.log(error);
                setIsLoaded(true);
                setIsError(true);
            }
        )
    }, [])

    return(
        <>
            <Helmet>
                <title>Track Leaderboards - MTA Mens )</title>
            </Helmet>
            <br/>
            {isError && 
                <Typography style={{ textAlign: 'center', color: 'red' }} variant="h6">An error occured while downloading track leaderboard info, 
                contact hoxi or iguana with the console output</Typography>}

            <Grid container justifyContent="center">

                <br/>
                <Button variant="contained" color="primary" component={Link} to="/">Return to index page</Button>
            </Grid>
            <br/>
            {!isLoaded && 
            <Grid style={{ height: '100vh' }} container alignItems="center" justifyContent="center">
                <CircularProgress size={100}/>
            </Grid>}

            {isLoaded && 
            <>
                <Container>
                    <Autocomplete
                        onChange={(event, value, reason) => {
                            if (reason === "select-option") {
                                history.push(`./${encodeURI(value.track_name)}`)
                            }
                        }} 
                        noOptionsText="No tracks to display"
                        options={trackLBs.sort((a, b) => a.track_name.localeCompare(b.track_name))} 
                        getOptionLabel={(option) => option.track_name} 
                        renderInput={(params) => <TextField {...params} label="Search for track" variant="filled" />}/> 
                </Container>
                <Switch>
                    <Route path={`${match.path}/:trackName`}>
                        <TrackLeaderboard tracks={trackLBs}/>
                    </Route>
                    <Route path={match.path}>
                        <br/>
                        <Typography variant="h4" style={{ textAlign: 'center' }}><b>Please select a track</b></Typography>
                    </Route>
                </Switch>          
            </>
            }
            

        </>
    )
}