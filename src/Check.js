import React, { useEffect, useState } from "react";
import "./App.css";
import Webcam from "react-webcam";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import back1 from "../src/Images/back1.jpg";
import check2 from "../src/Images/check2.svg";
import { Button, Paper } from "@mui/material";
import StartIcon from "@mui/icons-material/Start";
import Alert from "@mui/material/Alert";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import audiowave from "./Images/audiowave.gif";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  height: 590,
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  borderRadius: "8px",
  p: 2,
};

const steps = [
  {
    label: "Internet Connection",
  },
  {
    label: "Browser Compatability",
  },
  {
    label: "Speaker",
  },
  {
    label: "Camera",
  },
  {
    label: "Mic",
  },
  {
    label: "Location",
  },
];

const Check = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [alert, setAlert] = useState("warning"); // Set the alert value success or warning
  const [warningMsg, setWarningMsg] = useState(""); // Give the alert Message
  const [note, setNote] = useState(""); // Give details about the device,Location
  const [testCamera, setTestCamera] = useState(false); //for check camera
  const [testSpeaker, setTestSpeaker] = useState(false); //for Speaker
  // const [testMic, setTestMic] = useState(false); //for mic,
  // const [micCheckModal, setMicCheckModal] = useState(false); // for testing mic
  const [open, setOpen] = React.useState(false); //for checking camera modal

  const handleOpen = () => {
    if (activeStep === 3) setOpen(true);
    setAlert("success");
    setWarningMsg("Camera works perfectly");
  };
  const handleClose = () => setOpen(false);
  const stepIncrease = (prevActiveStep) => {
    setActiveStep(prevActiveStep + 1);
  };
  const chromeCheck = () => {
    const agent = navigator.userAgent.toLowerCase();
    switch (true) {
      case agent.indexOf("edge") > -1:
        return "MS Edge";
      case agent.indexOf("edg/") > -1:
        return "Edge ";
      case agent.indexOf("opr") > -1 && !!window.opr:
        return "Opera";
      case agent.indexOf("chrome") > -1 && !!window.chrome:
        return "Chrome";
      case agent.indexOf("trident") > -1:
        return "MS IE";
      case agent.indexOf("firefox") > -1:
        return "Firefox";
      case agent.indexOf("safari") > -1:
        return "Safari";
      default:
        return "other";
    }
  };
  const playSound = () => {
    const audio = document.createElement("audio");
    audio.controls = true;
    audio.autoplay = true;
    audio.src =
      "https://media.geeksforgeeks.org/wp-content/uploads/20190531135120/beep.mp3";
    setAlert("success");
    setWarningMsg("Your Speaker works perfectly");
    setTestSpeaker(true);
  };
  const speakerCheck = () => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
      setAlert("warning");
      setWarningMsg("Speaker Not Found");
    } else {
      navigator.mediaDevices
        .enumerateDevices()
        .then(function (devices) {
          devices.every(function (device) {
            if (device.kind === "audiooutput") {
              setAlert("success");
              setWarningMsg("Speaker Detected");
              setTestSpeaker(true);
              return false;
            } else {
              setAlert("warning");
              setWarningMsg("Speaker Not Found");
              return true;
            }
          });
        })
        .catch(function (err) {
          console.log(err.name + ": " + err.message);
        });
    }
  };
  const micCheck = () => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
      setAlert("warning");
      setWarningMsg("Mic Not Found");
    } else {
      navigator.mediaDevices
        .enumerateDevices()
        .then(function (devices) {
          devices.every(function (device) {
            if (device.kind === "audioinput") {
              setAlert("success");
              setWarningMsg("Mic Detected");

              return false;
            } else {
              setAlert("warning");
              setWarningMsg("Microphone Not Found");
              return true;
            }
          });
        })
        .catch(function (err) {
          console.log(err.name + ": " + err.message);
        });
    }
  };

  const getLocation = async (coord) => {
    try {
      // console.log(coord.Latitude, coord.Longitude);
      let url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${coord.Latitude}&longitude=${coord.Longitude}&localityLanguage=en`;
      const response = await fetch(url);
      const data = await response.json();
      const Country = data.localityInfo.administrative[0].name.split(" ")[0];
      const State = data.localityInfo.administrative[1].name.split(" ")[0];
      const Locality = data.localityInfo.administrative[3].name.split(" ")[0];
      const District = data.localityInfo.administrative[2].name.split(" ")[0];
      setNote(() => (
        <>
          <Typography>
            <b>Location:</b>&nbsp;
            <br />( {`${Locality},${District},`}
            <br />
            {`${State},${Country}`} )
          </Typography>
        </>
      ));
    } catch (error) {
      console.log(error);
    }
  };
  const handleNext = () => {
    if (activeStep === 0) {
      if (navigator.onLine) {
        setAlert("success");
        setWarningMsg("You are online");
      } else {
        setAlert("warning");
        setWarningMsg("Please Turn on your connection");
      }
    } else if (activeStep === 1) {
      if (chromeCheck() === "Chrome") {
        setAlert("success");
        setWarningMsg("Your browser is compatable");
        setNote(() => (
          <>
            <Typography variant="h8">
              You are currently using <b>Chrome</b> browser
            </Typography>
          </>
        ));
      } else {
        setAlert("warning");
        setWarningMsg("Please use Chrome browser");
      }
    } else if (activeStep === 2) {
      setNote("");
      speakerCheck();
    } else if (activeStep === 3) {
      setAlert("");
      setWarningMsg(() => (
        <>
          <RotateLeftIcon sx={{ mt: -1.5 }} />
          Please Wait,Loading.....
        </>
      ));
      setTestCamera(false);
      setAlert("warning");
      setTestSpeaker(false);
      navigator.getUserMedia(
        {
          video: true,
        },
        () => {
          setAlert("success");
          setWarningMsg("Camera Detected");
          setTestCamera(true);
        },
        () => {
          setAlert("warning");
          setWarningMsg("Camera not found");
          setTestCamera(false);
        }
      );
    } else if (activeStep === 4) {
      setTestCamera(false);
      micCheck();
    } else if (activeStep === 5) {
      setAlert("warning");
      setWarningMsg("Turn on your location");
      setTestCamera(false);
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          setAlert("success");
          const coordinate = {
            Latitude: position.coords.latitude,
            Longitude: position.coords.longitude,
          };
          setWarningMsg("Your Location detects successfully");
          getLocation(coordinate);
          setTestCamera(false);
        });
      } else {
        setAlert("warning");
        setWarningMsg("Turn on your location");
        setTestCamera(false);
      }
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    if (activeStep === 1) {
      setNote(false);
    }
    if (activeStep === 2) {
      setTestSpeaker(false);
      setTestCamera(false);
    }
    if (activeStep === 3) {
      setTestCamera(false);
    }
    if (activeStep === 4) {
      setNote(false);
      setTestCamera(false);
    }
    if (activeStep === 5) {
      setNote(false);
    }
  };

  const handleProceed = () => {
    // setActiveStep(0);
  };

  //on page load check for network connection
  useEffect(() => {
    handleNext();
    // eslint-disable-next-line
  }, [, activeStep]);

  return (
    <div
      style={{
        backgroundImage: "url(" + back1 + ")",
        backgroundPosition: "center",
        backgroundSize: "cover",
        height: "120vh",
      }}
    >
      <Container>
        <Grid container spacing={0} justifyContent="center">
          <Grid item lg={12} xs={10}>
            <>
              <Card
                sx={{
                  mt: 3,
                  backgroundColor: "#fff",
                  borderRadius: "5px",
                }}
              >
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
                <Grid container justifyContent="center" spacing={0}>
                  <Grid item lg={6} xs={10}>
                    <Box sx={{ maxWidth: 400, m: 5 }}>
                      <Stepper activeStep={activeStep} orientation="vertical">
                        {steps.map((step, index) => (
                          <Step key={step.label}>
                            <StepLabel
                              optional={
                                index === 2 ? (
                                  <Typography variant="caption"></Typography>
                                ) : null
                              }
                            >
                              {step.label}
                            </StepLabel>
                            <StepContent>
                              <Box sx={{ mb: 2 }}>
                                <div>
                                  <Alert severity={alert}>{warningMsg}</Alert>
                                  {activeStep === 4 && alert === "success" && (
                                    <img
                                      src={audiowave}
                                      className="waveImgStyle"
                                      alt=""
                                    />
                                  )}

                                  <Typography sx={{ mt: 1, m: 1 }}>
                                    {note}
                                  </Typography>
                                  {testSpeaker ? (
                                    <Typography sx={{ textAlign: "center" }}>
                                      <Button
                                        onClick={playSound}
                                        sx={{
                                          mb: 0.1,
                                          fontweight: "bold",
                                          mr: 1,
                                          color: "black",
                                        }}
                                      >
                                        <VolumeUpIcon
                                          sx={{
                                            color: "blue",
                                            mb: -0.2,
                                            padding: "4px",
                                          }}
                                        />{" "}
                                        Check Speaker
                                      </Button>
                                    </Typography>
                                  ) : (
                                    ""
                                  )}
                                  {/* {testMic ? (
                                      <Typography sx={{ textAlign: "center" }}>
                                        <Button
                                          onClick={micCheck}
                                          sx={{
                                            mb: -1,
                                            fontweight: "bold",
                                            mr: 1,
                                            color: "black",
                                          }}
                                        >
                                          <KeyboardVoiceIcon
                                            sx={{
                                              color: "blue",
                                              mb: -0.4,
                                              padding: "4px",
                                            }}
                                          />
                                          Check Your Mic
                                        </Button>
                                      </Typography>
                                    ) : (
                                      ""
                                    )} */}
                                  {testCamera ? (
                                    <Typography sx={{ textAlign: "center" }}>
                                      <Button
                                        onClick={handleOpen}
                                        sx={{
                                          mb: -1,
                                          fontweight: "bold",
                                          mr: 1,
                                          color: "black",
                                          mb: 0.2,
                                        }}
                                      >
                                        <PhotoCameraIcon
                                          sx={{
                                            color: "blue",
                                            mb: -0.4,
                                            padding: "4px",
                                          }}
                                        />{" "}
                                        Check Your Camera
                                      </Button>
                                    </Typography>
                                  ) : (
                                    ""
                                  )}

                                  <Modal
                                    open={open}
                                    onClose={handleClose}
                                    aria-labelledby="modal-modal-title"
                                    aria-describedby="modal-modal-description"
                                  >
                                    <Box sx={style}>
                                      <Card>
                                        <Typography
                                          id="modal-modal-title"
                                          variant="h6"
                                          component="h2"
                                          sx={{
                                            float: "left",
                                            fontWeight: "bold",
                                          }}
                                        >
                                          <PhotoCameraIcon
                                            sx={{
                                              color: "blue",
                                              mb: -0.9,
                                              padding: "4px",
                                            }}
                                          />
                                          Camera
                                        </Typography>

                                        <Typography
                                          id="modal-modal-title"
                                          variant="h6"
                                          component="h2"
                                          sx={{
                                            float: "right",
                                            color: "#f7192b",
                                          }}
                                        >
                                          <Button onClick={handleClose}>
                                            <CancelPresentationIcon />
                                          </Button>
                                        </Typography>
                                      </Card>

                                      <Card sx={{ mt: 1 }}>
                                        <Webcam
                                          audio={false}
                                          style={{
                                            marginTop: "10px",
                                            height: "520px",
                                            width: "780px",
                                          }}
                                        />
                                      </Card>
                                    </Box>
                                  </Modal>

                                  <Button
                                    variant="contained"
                                    onClick={() => stepIncrease(activeStep)}
                                    sx={{ mt: 1, mr: 1 }}
                                    disabled={alert === "warning"}
                                  >
                                    {index === steps.length - 1
                                      ? "Finish"
                                      : "Continue"}
                                  </Button>
                                  <Button
                                    disabled={index === 0}
                                    onClick={handleBack}
                                    sx={{ mt: 1, mr: 1 }}
                                  >
                                    Back
                                  </Button>
                                </div>
                              </Box>
                            </StepContent>
                          </Step>
                        ))}
                      </Stepper>
                      {activeStep === steps.length && (
                        <Paper square elevation={0} sx={{ p: 3 }}>
                          <Typography>
                            Compatability steps completed - your system is
                            compatable.
                          </Typography>
                          <Button
                            onClick={handleProceed}
                            variant="contained"
                            fullWidth
                            sx={{ mt: 1, mr: 1 }}
                            color="success"
                          >
                            Proceed&nbsp;
                            <StartIcon />
                          </Button>
                        </Paper>
                      )}
                    </Box>
                  </Grid>
                  <Grid item lg={6}>
                    <Box>
                      <img
                        src={check2}
                        height="450px"
                        width="450px"
                        alt="system"
                        style={{ marginTop: "45px" }}
                      />
                    </Box>
                  </Grid>
                </Grid>
              </Card>
            </>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Check;
