import { Paper, Typography } from "@mui/material";
import TimeLine from "./TimeLine";
import ky from "ky"
import { useEffect, useState } from "react";
import moment from "moment";

const TimeLineView = ({ uri, step, style }) => {
  const [events, setEvents] = useState([])

  useEffect(() => {
    if (uri == null) {
      return setEvents([])
    }
    ky(uri + "/events?limit=100&offset=0").json()
      .then(res => {
        setEvents(res.results.sort((e1, e2) => moment(e1.actualDateTime) - moment(e2.actualDateTime)) || [])
      })
  }, [uri, step])


  return <Paper style={{
    padding: "0.5rem",
    ...style
  }} variant="outlined"  >
    <Typography variant="h5">Events Timeline</Typography>
    {events?.length > 0
      ? <TimeLine events={events} />
      : <Typography
        component="p"
        variant="caption"
        style={{ marginTop: "0.5rem" }}>No events to deisplay</Typography>
    }
  </Paper>;
};

export default TimeLineView;
