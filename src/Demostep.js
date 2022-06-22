import React from "react";
import back1 from "../src/Images/back1.jpg";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Box, Grid, Typography, Divider, CssBaseline } from "@mui/material";
const theme = createTheme();
const Demostep = () => {
  return (
    <ThemeProvider theme={theme}>
      <div
        style={{
          backgroundImage: "url(" + back1 + ")",
          backgroundPosition: "center",
          backgroundSize: "cover",
          height: "100vh",
        }}
      >
        <CssBaseline />
        <div style={{ height: "100vh", backgroundColor: "rgba(0,0,0,0.3)" }}>
          <Box
            sx={{
              flexGrow: 1,
              paddingTop: "45px",
              textAlign: "center",
              width: "100%",
            }}
          >
            <Grid container justifyContent="center">
              <Grid item sm={10} sx={{}}>
                <Typography
                  variant="h4"
                  align="center"
                  style={{
                    fontFamily: "sans",
                    background:
                      " linear-gradient(to bottom, #6363e6 0%, #666699 100%)",
                    color: "white",
                    padding: "10px",
                  }}
                >
                  System Compatability Check
                </Typography>
              </Grid>
            </Grid>
            <Divider />
            <Grid container component="main" justifyContent="center">
              <Grid sm={6} xs={12}>
                  <Box>
                    hi
                  </Box>
              </Grid>
              <Grid sm={6} xs={false}>
                <Box >
                  Hi
                </Box>
              </Grid>
            </Grid>
          </Box>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Demostep;
