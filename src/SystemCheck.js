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

const SystemCheck = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const nextStep = () => {
    if(activeStep < 5)
    setActiveStep((currentStep) => currentStep + 1);
  };
  const previousStep = () => {
    if(activeStep !== -1)
    setActiveStep((currentStep) => currentStep - 1);
  };
  return (
    <div
      style={{
        backgroundImage: "url(" + back1 + ")",
        backgroundPosition: "center",
        backgroundSize: "cover",
        height: "100vh",
      }}
    >
      <Container>
        <Grid container spacing={0} justifyContent="center">
          <Grid item lg={12}>
            <Card sx={{ mt: 5, height: "510px" }}>
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
                <Grid item lg={8}>
                  <Box sx={{ width: '100%' }}>
                    
                    <Stepper active={activeStep} orientation="vertical" sx={{m:2}}>
                      <Step>
                        <StepLabel>Internet Connection </StepLabel>
                      </Step>
                      <Step>
                        <StepLabel>Browser Compatability</StepLabel>
                      </Step>
                      <Step>
                        <StepLabel>Speaker</StepLabel>
                      </Step>
                      <Step>
                        <StepLabel>Camera</StepLabel>
                      </Step>
                      <Step>
                        <StepLabel>Mic </StepLabel>
                      </Step>
                      <Step>
                        <StepLabel>Location</StepLabel>
                      </Step>
                    </Stepper>
                    <Typography>{activeStep}</Typography>
                    <Button variant="outlined" onClick={() => nextStep()}>
                      Next
                    </Button>{" "}
                    &nbsp;
                    <Button variant="outlined" onClick={() => previousStep()}>
                      Previous
                    </Button>
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

export default SystemCheck;
