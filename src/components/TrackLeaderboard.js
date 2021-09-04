import { Grid, Table, TableContainer, Typography, Paper, TableHead, TableRow, TableCell, TableBody } from "@material-ui/core";
import { useParams } from "react-router";

function removeColors(input) {
    return input.replace(/#[a-fA-F0-9]{6}/,"")
}


export default function TrackLeaderboard({ tracks }) {
    let { trackName } = useParams();

    let track = tracks.find(track => track.track_name === trackName);

    return(
        <>
            <br/>
            {track.times.length === 0 &&
                <Typography variant="h5" style={{ textAlign: 'center' }}><b>This track has no top times</b></Typography>}
            <br/>
            <Grid container justifyContent="center">
                <Typography variant="h4"><b>{ track.track_name }</b></Typography>
                <TableContainer component={Paper}>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>Rank</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Time</TableCell>
                                <TableCell>Date</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {track.times.map((time, index) => (
                                <TableRow key={time.name}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{removeColors(time.name)}</TableCell>
                                    <TableCell>{time.time}</TableCell>
                                    <TableCell>{time.date}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
            
        </>
    )
}