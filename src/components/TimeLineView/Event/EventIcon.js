import QuestionMarkIcon from '@mui/icons-material/QuestionMark';

const SDLEventIcon = ({ event }) => {
  switch (event.code) {
    case "ACTIVITY_STARTED":
    default: <QuestionMarkIcon />
  }
}

const NeOneEventIcon = ({ event }) => {
  switch (event.code) {
    default: <QuestionMarkIcon />
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
