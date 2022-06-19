import * as React from "react";
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile,
  CustomView,
  browserName,
} from "react-device-detect";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import StepButton from "@mui/material/StepButton";
import StepIcon from "@mui/material/StepIcon";
import Typography from "@mui/material/Typography";
import back1 from "../src/Images/back1.jpg";
import { Button, Paper } from "@mui/material";
import StartIcon from "@mui/icons-material/Start";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NetworkCheckIcon from "@mui/icons-material/NetworkCheck";

const steps = [
  "Internet Connection",
  "Browser Compatability",
  "Speaker",
  "Mic",
  "Camera",
  "Location",
];

const Check = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  const isStepOptional = (step) => {
    return step === 2;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
    if (activeStep === 0 && navigator.onLine) {
      console.log("oniline");
    } else {
      console.log("offline");
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };
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
          <Grid item lg={11} xs={10}>
            <Card sx={{ mt: 3, height: "640px" }}>
              <Typography
                variant="h4"
                align="center"
                style={{
                  fontFamily: "sans",
                  background:
                    " linear-gradient(to bottom, #000066 0%, #666699 100%)",
                  color: "white",
                  padding: "10px",
                }}
              >
                System Compatability Check
              </Typography>
              <Grid container justifyContent="center">
                <Grid item lg={10} xs={10}>
                  <Box sx={{ width: "100%" }}>
                    <Stepper orientation="vertical" activeStep={activeStep}>
                      {steps.map((label, index) => {
                        const stepProps = {};
                        const labelProps = {};
                        if (isStepOptional(index)) {
                          labelProps.optional = (
                            <>
                              <Typography variant="caption">
                                Check Your browser
                              </Typography>
                              <Typography variant="caption">
                                Check Your browser
                              </Typography>
                            </>
                          );
                        }
                        if (isStepSkipped(index)) {
                          stepProps.completed = false;
                        }
                        return (
                          <Step key={label} {...stepProps}>
                            <StepLabel {...labelProps}>{label}</StepLabel>
                          </Step>
                        );
                      })}
                    </Stepper>
                    {activeStep === steps.length ? (
                      <React.Fragment>
                        <Typography sx={{ mt: 2, mb: 1 }}>
                          All steps completed - you&apos;re finished
                        </Typography>
                        <Box
                          sx={{ display: "flex", flexDirection: "row", pt: 0 }}
                        >
                          <Box sx={{ flex: "1 1 auto" }} />
                          <Button variant="outlined" onClick={handleReset}>
                            Reset
                          </Button>
                        </Box>
                      </React.Fragment>
                    ) : (
                      <React.Fragment>
                        <Box
                          sx={{ display: "flex", flexDirection: "row", pt: 2 }}
                        >
                          <Button
                            color="inherit"
                            disabled={activeStep === 0}
                            onClick={handleBack}
                            sx={{ mr: 1 }}
                            variant="outlined"
                          >
                            Back
                          </Button>
                          <Box sx={{ flex: "1 1 auto" }} />
                          {isStepOptional(activeStep) && (
                            <Button
                              color="inherit"
                              onClick={handleSkip}
                              sx={{ mr: 1 }}
                            >
                              Skip
                            </Button>
                          )}

                          <Button onClick={handleNext} variant="outlined">
                            {activeStep === steps.length - 1
                              ? "Finish"
                              : "Next"}
                          </Button>
                        </Box>
                      </React.Fragment>
                    )}
                  </Box>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Check;
