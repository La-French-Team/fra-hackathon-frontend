import { Typography } from "@mui/material"

export default ({ event }) => {
  if (!event) {
    return "No content"
  }
  return <div style={{
    paddingTop: "0.5rem",
    maxWidth: "8rem",
    minWidth: "8rem"
  }}>
    <Typography component="span">
      {event.date}
    </Typography>
    <Typography>{event.hour}</Typography>
  </div>
}