import Timeline from '@mui/lab/Timeline';
import Event from './Event';

export default ({ events }) => {
  return <Timeline position="right"
  sx={{
    maxHeight: "calc(100% - 32px)",
    overflowY:"auto",
    paddingBottom: "1rem"
  }}>
    {events.map((event, index) => (
      <Event
        event={event}
        first={index === 0}
        last={index === events.size - 1} />
    ))}
  </Timeline>
}