import { Paper, Typography } from "@mui/material"

export default ({ event }) => {
  if (!event) {
    return "No content"
  }
  return <Paper style={{
    display: "flex",
    padding: "0.5rem",
    maxWidth: "30rem",
    minWidth: "30rem"
  }}>
    <div>
      <Typography component="p">
        {event.code}
      </Typography>
      <Typography
        component="p"
        color="text.secondary"
        sx={{
          textOverflow: "ellipsis",
          overflow: "hidden",
          width: "20rem",
          maxWidth: "20rem",
          whiteSpace: "nowrap"
        }}
        title={event.description}>
        {event.description}
      </Typography>
    </div>
    {event.locationName && <div>
      <Typography
        sx={{
          textOverflow: "ellipsis",
          overflow: "hidden",
          width: "8rem",
          maxWidth: "8rem",
          whiteSpace: "nowrap"
        }}
        title={event.locationName}>{event.locationName}</Typography>
      <Typography color="text.secondary">
        {event.locality}, {event.countrycode}
      </Typography>
    </div>}
  </Paper>
}