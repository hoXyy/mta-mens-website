import {
  Grid,
  Table,
  TableContainer,
  Typography,
  Paper,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import * as moment from "moment-timezone";

function removeColors(input) {
  return input.replace(/#[a-fA-F0-9]{6}/, "");
}

export default function TrackLeaderboard({ tracks, current }) {
  let track = tracks.find((track) => track.track_name === current);

  if (!current) {
    return (
      <>
        <br />
        <Typography variant="h4" style={{ textAlign: "center" }}>
          <b>Please select a track</b>
        </Typography>
      </>
    );
  } else {
    return (
      <>
        {track.times.length === 0 && (
          <Typography variant="h5" style={{ textAlign: "center" }}>
            <b>This track has no top times</b>
          </Typography>
        )}
        <br />
        <Grid container justifyContent="center">
          <Typography variant="h4">
            <b>{track.track_name}</b>
          </Typography>
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
                    <TableCell>
                      {moment
                        .tz(time.date, "Europe/Tallinn")
                        .local()
                        .format("YYYY-MM-DD HH:mm:ss")}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </>
    );
  }
}
