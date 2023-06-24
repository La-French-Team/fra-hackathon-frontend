import { TimelineConnector, TimelineContent, TimelineDot, TimelineItem, TimelineOppositeContent, TimelineSeparator } from "@mui/lab"
import EventIcon from "./EventIcon"
import EventContent from "./EventContent"
import moment from "moment/moment"
import EventOppositeContent from "./EventOppositeContent"

const mapSDLEvent = event => ({
  code: event.code,
  description: event.description,
  locationName: event.location.locationName,
  locality: event.location.address.addressLocality,
  countrycode: event.location.address.addressCountry.countryCode,
  hour: moment(event.actualDateTime).format('LT'),
  date: moment(event.actualDateTime).format('LL'),
  status: "IN PROGRESS"
})
const mapNeOneEvent = event => ({
  code: event["https://onerecord.iata.org/ns/cargo#eventCode"],
  description: event["https://onerecord.iata.org/ns/cargo#eventName"],
  locationName: null,
  locality: null,
  countrycode: null,
  hour: moment(event["https://onerecord.iata.org/ns/cargo#eventDate"]).format('LT'),
  date: moment(event["https://onerecord.iata.org/ns/cargo#eventDate"]).format('LL'),
  status: "DONE"
})

const formatEvent = event => {
  return !!event["@type"]
    ? mapNeOneEvent(event)
    : mapSDLEvent(event)
}

const getColor = event => {
  switch (event.status) {
    case "DONE":
      return "success"
    case "IN PROGRESS":
      return "info"
    default:
      return null
  }
}

export default ({ event, first, last }) => {
  const formattedEvent = formatEvent(event)
  return <TimelineItem>
    <TimelineOppositeContent
      sx={{ flex: "1 1 auto" }}
      color="text.secondary"
    >
      <EventOppositeContent event={formattedEvent} />
    </TimelineOppositeContent>
    <TimelineSeparator>
      {!first && <TimelineConnector />}
      <TimelineDot color={getColor(formattedEvent)}>
        <EventIcon event={event} />
      </TimelineDot>
      {!last && <TimelineConnector />}
    </TimelineSeparator>
    <TimelineContent sx={{
      py: '12px',
      px: 2,
      flex: "3 1 auto"
    }}>
      <EventContent
        event={formattedEvent} />
    </TimelineContent>
  </TimelineItem >
}
