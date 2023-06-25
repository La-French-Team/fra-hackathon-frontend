import call from "@/backend/backend";
import { LoadingButton } from "@mui/lab";
import { Paper, Step, StepLabel, Stepper, Typography } from "@mui/material";
import { useSession } from "next-auth/react";
import { enqueueSnackbar } from "notistack";
import { useContext, useEffect, useState } from "react";
import { ApiContext } from "../ApiContext";
import { useRouter } from "next/router";

const steps = [
  {
    label: "Customer request & forwarder planning",
    description: ""
  },
  {
    label: "Pre & Post Carriage Booking",
    description: ""
  },
  {
    label: "Air transport booking & airport handling planning",
    description: ""
  },
  {
    label: "Execute transport from origin to destination airport",
    description: ""
  },
  {
    label: "Handling at destination airport",
    description: "",
    isGhaActions: true
  },
  {
    label: "Last mile delivery",
    description: "",
    isTruckerActions: true
  },
]

const ActionBanner = ({ style, onDataChange, onReset }) => {
  const session = useSession();
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(0)
  const [isLoading, setIsLoading] = useState(0)
  const { apiUrl } = useContext(ApiContext);

  useEffect(() => {
    setIsLoading(true)
    call(apiUrl, "current", session)
      .then(res => {
        onDataChange(res, activeStep)
        setActiveStep(res[0].stage)
      })
      .catch(err => {
        enqueueSnackbar(err.message, { variant: "error" })
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  const onStart = () => {
    setIsLoading(true)
    call(apiUrl, "init", session)
      .then((res) => {
        onDataChange(res, activeStep)
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

    if (steps[activeStep]?.isGhaActions) {
      return router.push("/newmission")
    }
    if (steps[activeStep]?.isTruckerActions) {
      return router.push("/oneroad")
    }
    call(apiUrl, "nextStep", session).then((res) => {
      onDataChange(res, activeStep)
    })
      .catch(err => {
        enqueueSnackbar(err.message, { variant: "error" })
      })
      .finally(() => {
        setIsLoading(false)
        setActiveStep(activeStep + 1)
      })
  }

  const onResetClick = async () => {
    setIsLoading(true)
    call(apiUrl, "reset", session)
      .then(() => { })
      .catch(() => { })
      .finally(() => {
        onDataChange([], activeStep)
        setActiveStep(0)
        setIsLoading(false)
        onReset()
      })
  }

  console.log(activeStep)


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
            <Step
              key={step.label}
              sx={{
                '& svg.Mui-completed': {
                  color: 'success.dark', // circle color (COMPLETED)
                },
              }}
              {...step.props} >
              <StepLabel
                optional={
                  <Typography variant="caption">{step.description}</Typography>
                }
                {...step.labelProps} >{step.label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <div style={{
        width: "50%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        margin: "0 1rem"
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
            disabled={isLoading || activeStep >= steps.length}
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
          variant="outlined"
          color="warning"
          onClick={onResetClick}
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
