import { Paper, Typography } from "@mui/material";
import TimeLine from "./TimeLine";
import eventExample from "./event-example";

const TimeLineView = ({ style }) => {
  return <Paper style={{
    padding: "0.5rem",
    ...style
  }}  >
    <Typography variant="h5">Timeline</Typography>
    <TimeLine events={eventExample} />
  </Paper>;
};

export default TimeLineView;
