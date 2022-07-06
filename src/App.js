import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Index from "./views/Index";
import TrackTimes from "./views/TrackTimes";

function App() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? "dark" : "light",
        },
      }),
    [prefersDarkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/track_times" element={<TrackTimes />} />
          <Route path="/" element={<Index theme={theme} />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
