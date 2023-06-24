import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import CircleIcon from '@mui/icons-material/Circle';
import StartIcon from '@mui/icons-material/Start';
import DoneIcon from '@mui/icons-material/Done';
import FlightLandIcon from '@mui/icons-material/FlightLand';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';

const SDLEventIcon = ({ event }) => {
  if (event.code.endsWith("STARTED")) {
    return <StartIcon />
  } else if (event.code.endsWith("FINISHED")) {
    return <DoneIcon />
  } else if (event.code === "LOCATION_ARRIVED") {
    return <FlightLandIcon />
  } else if (event.code === "LOCATION_EXIT") {
    return <FlightTakeoffIcon />
  }
  return <CircleIcon />
}

const NeOneEventIcon = ({ event }) => {
  switch (event.code) {
    default: return <CircleIcon />
  }
}

export default ({ event }) => {
  if (!event) {
    return <QuestionMarkIcon />
  }
  return !!event["@type"]
    ? <NeOneEventIcon event={event} />
    : <SDLEventIcon event={event} />
}
