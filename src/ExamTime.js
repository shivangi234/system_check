import React from "react";
import { useEffect } from "react";
import back1 from "./Images/back1.jpg";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import {
  AppBar,
  Grid,
  Box,
  Typography,
  Button,
  Card,
  Stack,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import Countdown from "react-countdown";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import StartIcon from "@mui/icons-material/Start";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#616161",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
function createData(
  Subject,
  NoofQuestion,
  MarksPartition,
  NegativeMark,
  TotalMark
) {
  return { Subject, NoofQuestion, MarksPartition, NegativeMark, TotalMark };
}

const rows = [
  createData("Aptitude", 80, 3, 0.5, 400),
  createData("Reasoning", 60, 3, 1, 400),
  createData("English", 60, 3, 1, 400),
];
const Completionist = () => (
  <span style={{ color: "green", fontFamily: "cursive", fontWeight: "bolder" }}>
    You are ready to start the examination now!
  </span>
);
const renderer = ({ hours, minutes, seconds, completed }) => {
  if (completed) {
    // Render a completed state
    return <Completionist />;
  } else {
    // Render a countdown
    return (
      <span>
        {hours}:{minutes}:{seconds}
      </span>
    );
  }
};

const ExamTime = () => {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#2a0a3b",
      },
    },
  });
  const [startButton, setStartButton] = React.useState(true);
  useEffect(() => {
    setTimeout(() => {
      setStartButton(false);
    }, 15000);
  });
  return (
    <ThemeProvider theme={theme}>
      <div
        style={{
          backgroundImage: "url(" + back1 + ")",
          backgroundPosition: "center",
          backgroundSize: "cover",
          maxHeight: "180vh",
        }}
      >
        <Grid container>
          <Grid item lg={12} xs={12} md={6} sm={3}>
            <AppBar position="static" color="primary" elevation={0}>
              <Box sx={{ width: "100%" }}>
                <Typography variant="h5" sx={{ flexGrow: 1, float: "left" }}>
                  <AppRegistrationIcon
                    sx={{ fontSize: "25px", float: "left" }}
                  />
                  <span style={{ fontSize: "28px", fontWeight: "bolder" }}>
                    TOTAL
                  </span>
                  <span style={{ fontSize: "16px", fontWeight: "bolder" }}>
                    Assesment
                  </span>
                </Typography>
                <Typography sx={{ float: "right" }}>
                  <Button
                    variant="contained"
                    color="warning"
                    sx={{ padding: "0 10px", mt: 1, mb: 1 }}
                  >
                    Login
                  </Button>
                </Typography>
              </Box>
            </AppBar>
          </Grid>
        </Grid>
        <Grid container justifyContent="center">
          <Grid item lg={8} xs={12}>
            <Card
              sx={{ mt: 3, height: "50px", mb: 1, backgroundColor: "#ede0da" }}
            >
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", ml: 35, mt: 1 }}
              >
                <span style={{ color: "orange" }}>U</span>
                <span style={{ color: "red" }}>P</span>
                <span style={{ color: "Blue" }}>S</span>
                <span style={{ color: "Green" }}>C</span> - [UNION PUBLIC
                SERVICE COMMISSION]
              </Typography>
            </Card>
          </Grid>
        </Grid>
        <Grid container justifyContent="center">
          <Grid item lg={8}>
            <Card>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>Subject</StyledTableCell>
                      <StyledTableCell align="right">
                        No Of Question
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        Marks Partition&nbsp;
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        Negative&nbsp;
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        TotalMark&nbsp;
                      </StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row) => (
                      <StyledTableRow key={row.name}>
                        <StyledTableCell component="th" scope="row">
                          {row.Subject}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {row.NoofQuestion}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {row.MarksPartition}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {row.NegativeMark}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {row.TotalMark}
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Card>
          </Grid>
        </Grid>
        <Grid container justifyContent="center">
          <Grid item lg={8}>
            <Card
              sx={{
                height: "50px",
                padding: "10px",
                backgroundColor: "#ede0da",
              }}
            >
              <Grid container>
                <Typography sx={{ fontWeight: "bold", ml: 10, mt: 1 }}>
                  Exam Details:&nbsp;&nbsp;
                </Typography>
                <Grid item lg={3}>
                  {" "}
                  <Button
                    variant="outlined"
                    color="warning"
                    sx={{ fontWeight: "bold" }}
                  >
                    Exam Duration : 1hr
                  </Button>
                </Grid>
                <Grid item lg={3}>
                  {" "}
                  <Button
                    variant="outlined"
                    color="warning"
                    sx={{ fontWeight: "bold" }}
                  >
                    Exam Starts : 10.00AM
                  </Button>
                </Grid>
                <Grid item lg={3}>
                  {" "}
                  <Button
                    variant="outlined"
                    color="warning"
                    sx={{ fontWeight: "bold" }}
                  >
                    Exam Ends : 11.00AM
                  </Button>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        </Grid>
        <Grid container justifyContent="center">
          <Grid item lg={4} md={3} sm={2} mt={6} mb={8}>
            <TableContainer component={Paper}>
              <Typography
                variant="h5"
                align="center"
                style={{
                  fontFamily: "sans",
                  background: "linear-gradient(230deg,#051817,#0e3839)",
                  color: "white",
                }}
              >
                <b>Examination Timer</b>
              </Typography>
              <Divider />
              <Typography
                variant="h5"
                align="center"
                style={{
                  fontFamily: "monospace",
                  color: "red",
                  backgroundColor: "#e9edf0",
                }}
              >
                <Countdown date={Date.now() + 10000}>
                  <Completionist />
                </Countdown>
              </Typography>
            </TableContainer>
          </Grid>
        </Grid>
        <Grid container justifyContent="center" spacing={2}>
          <card sx={{ mt: 6, mb: 2, m: 2 }}>
            <TableContainer component={Paper}>
              <Grid container justifyContent="center">
                <Grid item lg={12}>
                  <Typography
                    variant="h5"
                    align="center"
                    style={{
                      fontWeight: "bolder",
                      background: "linear-gradient(230deg,#051817,#f08e0e)",
                      color: "white",
                      padding: "2px",
                      borderRadius: "3px",
                      marginTop: "4px",
                      marginLeft: "4px",
                      marginRight: "4px",
                    }}
                  >
                    Examination Instructions
                  </Typography>
                  <Divider />
                  <Grid container justifyContent="center">
                    <Grid item lg={10}>
                      <card>
                        <Typography sx={{ mt: 3 }}>
                          ➢ The candidate has to read carefully, the
                          “Information Brochure” and “Instructions to fill the
                          online Application Form for UPSC-2022”.
                        </Typography>
                        <Typography>
                          ➢ First of all, the candidate is to visit UPSC website
                          (www.upsc.nic.in) and then go to the registration page
                          by clicking on “Fresh Candidate Registration”
                        </Typography>
                        <Typography>
                          ➢ The candidate has to read carefully, the
                          “Information Brochure” and “Instructions to fill the
                          online Application Form for UPSC-2022”.
                        </Typography>
                        <Typography>
                          ➢ First of all, the candidate is to visit UPSC website
                          (www.upsc.nic.in) and then go to the registration page
                          by clicking on “Fresh Candidate Registration”
                        </Typography>
                        <Typography>
                          ➢ The candidate has to read carefully, the
                          “Information Brochure” and “Instructions to fill the
                          online Application Form for UPSC-2022”.
                        </Typography>
                        <Typography>
                          ➢ First of all, the candidate is to visit UPSC website
                          (www.upsc.nic.in) and then go to the registration page
                          by clicking on “Fresh Candidate Registration”
                        </Typography>
                        <Stack
                          direction="row"
                          justifyContent="space-between"
                          sx={{
                            px: 2,
                            py: 1,
                            bgcolor: "background.default",
                            alignItems: "center",
                          }}
                        >
                          {startButton ? (
                            <Button
                              variant="contained"
                              disabled
                              align="center"
                              fullWidth
                            >
                              Start
                            </Button>
                          ) : (
                            <Button
                              variant="contained"
                              align="center"
                              fullWidth
                            >
                              Start
                            </Button>
                          )}
                        </Stack>
                      </card>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </TableContainer>
          </card>
        </Grid>
      </div>
    </ThemeProvider>
  );
};

export default ExamTime;
