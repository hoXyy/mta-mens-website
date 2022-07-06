import {
  Button,
  Container,
  TextField,
  Grid,
  CircularProgress,
  Typography,
  Autocomplete,
} from "@mui/material";
import { useEffect, useState } from "react";
import Helmet from "react-helmet";
import { useLocation, Link } from "react-router-dom";
import { useNavigate } from "react-router";
import TrackLeaderboard from "../components/TrackLeaderboard";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function TrackTimes() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  const [trackLBs, setTrackLBs] = useState([]);

  let navigate = useNavigate();
  let query = useQuery();

  useEffect(() => {
    fetch("https://mta.leguaan.ee/iguana_points/tracktimes.json")
      .then((res) => res.json())
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
      );
  }, []);

  return (
    <>
      <Helmet>
        <title>Track Leaderboards - MTA Mens )</title>
      </Helmet>
      <br />
      {isError && (
        <Typography style={{ textAlign: "center", color: "red" }} variant="h6">
          An error occured while downloading track leaderboard info, contact
          hoxi or iguana with the console output
        </Typography>
      )}

      <Grid container justifyContent="center">
        <br />
        <Button variant="outlined" color="primary" component={Link} to="/">
          Return to index page
        </Button>
      </Grid>
      <br />
      {!isLoaded && (
        <Grid
          style={{ height: "100vh" }}
          container
          alignItems="center"
          justifyContent="center"
        >
          <CircularProgress size={100} />
        </Grid>
      )}

      {isLoaded && (
        <>
          <Container>
            <Autocomplete
              onChange={(event, value, reason) => {
                if (reason === "selectOption") {
                  navigate(`/track_times?track=${encodeURI(value.track_name)}`);
                }
              }}
              noOptionsText="No tracks to display"
              options={trackLBs.sort((a, b) =>
                a.track_name.localeCompare(b.track_name)
              )}
              getOptionLabel={(option) => option.track_name}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Search for track"
                  variant="filled"
                />
              )}
            />
          </Container>
          <TrackLeaderboard tracks={trackLBs} current={query.get("track")} />
        </>
      )}
    </>
  );
}
