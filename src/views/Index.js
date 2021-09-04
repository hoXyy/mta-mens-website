import { Container, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper, CircularProgress, Button } from "@material-ui/core";
import { useState, useEffect } from "react";
import * as moment from 'moment';
import { Link } from "react-router-dom";
import Helmet from 'react-helmet';

function pad(string,length) {
    return (new Array(length+1).join("0")+string).slice(-length);
}

function removeColors(input) {
    return input.replace(/#[a-fA-F0-9]{6}/,"")
}

function formatTrackTime(time) {
    let msec = parseInt(time) % 1000
	let seconds = Math.floor(parseInt(time) / 1000)
    let minutes = Math.floor(seconds / 60)
	seconds = seconds % 60
    let time_string = pad(minutes, 2) + ":" + pad(seconds, 2) + "." + pad(msec, 3)
    return time_string;
}

export default function Index() {
    const [isLoaded, setIsLoaded] = useState(false)
    const [pointsLB, setPointsLB] = useState([]);
    const [trackRecords, setTrackRecords] = useState([]);
    const [isPointsError, setIsPointsError] = useState(false);
    const [isTrackRecordsError, setIsTrackRecordsError] = useState(false);

    useEffect(() => {
        fetch("https://mta.leguaan.ee/iguana_points/pointsleaderboard.json")
            .then(res => res.json())
            .then(
                (result) => {
                    setPointsLB(result);
                },
                (error) => {
                    console.log(error);
                    setIsPointsError(true);
                }
            )
        fetch("https://mta.leguaan.ee/iguana_points/trackrecords.json")
            .then(res => res.json())
            .then(
                (result) => {
                    setTrackRecords(result);
                    setIsLoaded(true);
                },
                (error) => {
                    console.log(error);
                    setIsLoaded(true);
                    setIsTrackRecordsError(true);
                }
            )
    }, [])

    return(
        <>
            <Helmet>
                <title>Index Page - MTA Mens )</title>
            </Helmet>
            <Container style={{ height: '100vh' }}>
                <br/>
                <Typography variant="h4" component="h4" style={{textAlign: 'center', marginTop: '10px', marginBottom: '100px'}}><a style={{ textDecoration: 'none', color: 'orange' }} href="mtasa://mta.leguaan.ee:22003"><b>mtasa://mta.leguaan.ee</b></a></Typography>
                {!isLoaded && 
                <Grid container justifyContent="center">
                    <CircularProgress size={100}/>
                </Grid>}

                {isPointsError && 
                <Typography style={{ textAlign: 'center', color: 'red' }} variant="h6">An error occured while downloading points info, 
                contact hoxi or iguana with the console output</Typography>}

                {isTrackRecordsError && 
                <Typography style={{ textAlign: 'center', color: 'red' }} variant="h6">An error occured while downloading track records info, 
                contact hoxi or iguana with the console output</Typography>}
                
                {isLoaded &&
                <>
                    <Grid container justifyContent="center">
                        <Button variant="contained" color="primary" component={Link} to="/track_times/">View track leaderboards</Button>
                    </Grid>
                    <br/>
                    <Grid container justifyContent="space-evenly" spacing={2}>
                        <Grid item>
                            <Typography variant="h5" align="center"><b>World Drivers' Championship standings</b></Typography>
                            <br/>
                            <TableContainer component={Paper}>
                                <Table size="small">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Rank</TableCell>
                                            <TableCell>Name</TableCell>
                                            <TableCell>Points</TableCell>
                                            <TableCell>Last updated</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {pointsLB.map((placement) => (
                                            <TableRow key={placement.rank}>
                                                <TableCell>{placement.rank}</TableCell>
                                                <TableCell>{removeColors(placement.name)}</TableCell>
                                                <TableCell>{placement.points}</TableCell>
                                                <TableCell>{moment(placement.last_updated + "Z").format("YYYY-MM-DD HH:mm:ss")}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                        <Grid item>
                            <Typography variant="h4" align="center"><b>Recent track records</b></Typography>
                            <br/>
                            <TableContainer component={Paper} style={{marginBottom: '100px'}}>
                                <Table size="small">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Name</TableCell>
                                            <TableCell>Map</TableCell>
                                            <TableCell>Time</TableCell>
                                            <TableCell>Date</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {trackRecords.map((record) => (
                                            <TableRow key={record.time}>
                                                <TableCell>{removeColors(record.name)}</TableCell>
                                                <TableCell>{record.map}</TableCell>
                                                <TableCell>{formatTrackTime(record.time)}</TableCell>
                                                <TableCell>{moment(record.date + "Z").format("YYYY-MM-DD HH:mm:ss")}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>  
                            </TableContainer>     
                        </Grid>                        

                    </Grid>            
                </> 
            }
            </Container>        
        </>

        
    );
}