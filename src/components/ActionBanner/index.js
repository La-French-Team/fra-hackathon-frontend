import call from "@/backend/backend";
import { LoadingButton } from "@mui/lab";
import { Paper, Step, StepLabel, Stepper } from "@mui/material";
import { useSession } from "next-auth/react";
import { enqueueSnackbar } from "notistack";
import { useContext, useState } from "react";
import { ApiContext } from "../ApiContext";

const steps = [
  {
    label: "Start",
    props: {}
  },
  {
    label: "Step 1",
    props: {}
  },
  {
    label: "Step 2",
    props: {}
  },
  {
    label: "Step 3",
    props: {}
  },
  {
    label: "End",
    props: {}
  },
]

const ActionBanner = ({ style, onDataChange }) => {
  const session = useSession();
  const [activeStep, setActiveStep] = useState(0)
  const [isLoading, setIsLoading] = useState(0)
  const { apiUrl } = useContext(ApiContext);


  const onStart = () => {
    setIsLoading(true)
    call(apiUrl, "init", session)
      .then((res) => {
        onDataChange(res)
      })
      .catch(err => {
        enqueueSnackbar(err.message, { variant: "error" })
      })
      .finally(() => {
        setIsLoading(false)
        setActiveStep(1)
      })
  }

  const onNextStep = async () => {
    setIsLoading(true)
    call(apiUrl, "nextStep", session).then((res) => {
      onDataChange(res)
    })
      .catch(err => {
        enqueueSnackbar(err.message, { variant: "error" })
      })
      .finally(() => {
        setIsLoading(false)
        setActiveStep(activeStep + 1)
      })
  }

  const onReset = async () => {
    setIsLoading(true)
    call(apiUrl, "reset", session)
      .then(() => {})
      .catch(()=> {})
      .finally(()=> {
        onDataChange([])
        setActiveStep(0)
        setIsLoading(false)
      })
  }


  return (
    <Paper style={{
      ...style,
      width: "100%",
      display: "flex",
      justifyContent: "space-around",
      alignItems: "stretch"
    }} variant="outlined">


      <Stepper activeStep={activeStep}>
        {steps.map((step, index) => {
          return (
            <Step key={step.label} {...step.props}>
              <StepLabel >{step.label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
        <div style={{
          width: "50%",
          display: "flex",
          justifyContent: "space-between"
        }}>
      {activeStep == 0
        ? <LoadingButton
          disabled={isLoading}
          loading={isLoading}
          variant="outlined"
          onClick={onStart}
          sx={{
            flex: "1 1 auto",
            mr: "1rem"
          }}
          >
          Start
        </LoadingButton>
        : <LoadingButton
          disabled={isLoading || activeStep >= steps.length - 1}
          loading={isLoading}
          variant="outlined"
          onClick={onNextStep}
          sx={{
            flex: "1 1 auto",
            mr: "1rem"
          }}
          >
          Next step
        </LoadingButton>}
      <LoadingButton
        disabled={isLoading}
        loading={isLoading}
        variant="contained"
        color="error"
        onClick={async () => onDataChange(await call(apiUrl, "current", session))}
        sx={{
          flex: "1 1 auto",
          mr: "1rem"
        }}
        >
        Get
      </LoadingButton>
      <LoadingButton
        disabled={isLoading}
        loading={isLoading}
        variant="outlined"
        color="warning"
        onClick={onReset}
        sx={{
          flex: "1 1 auto"
        }}
        >
        Reset
      </LoadingButton></div>
    </Paper >
  );
};

export default ActionBanner;
