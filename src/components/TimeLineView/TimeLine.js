import Timeline from '@mui/lab/Timeline';
import Event from './Event';

export default ({ events }) => {
  return <Timeline position="right"
  sx={{
    maxHeight: "85%",
    overflowY:"auto",
    paddingBottom: "0.5rem"
  }}>
    {events.map((event, index) => (
      <Event
        event={event}
        first={index === 0}
        last={index === events.size - 1} />
    ))}
  </Timeline>
}