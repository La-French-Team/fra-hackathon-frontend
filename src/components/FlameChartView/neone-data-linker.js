import { findElementById } from "./data-linker";

// NE: One service requests are linked between SDL and NE:One through ONE Record service link
export function retrieveNEOneAssociations(requests, serviceRequest) {
  const booking = retrieveBooking(requests, serviceRequest);
  const waybill = booking ? retrieveWaybill(requests, booking) : null;

  const activities = booking ? retrieveActivities(requests, booking) : []; // If the service is not found, default to empty activities
  const actions = [];
  return {
    serviceRequest,
    waybill,
    booking,
    activities,
    actions,
  };
}

function retrieveWaybill(requests, booking) {
  const waybill = findElementById(
    "https://onerecord.iata.org/ns/cargo#Waybill",
    booking.body["https://onerecord.iata.org/ns/cargo#issuedForWaybill"]["@id"],
    requests
  );
  if (!booking) {
    console.warn(
      "Could not find Waybill with id",
      booking.body["https://onerecord.iata.org/ns/cargo#issuedForWaybill"][
        "@id"
      ]
    );
  }
  return waybill;
}

function retrieveBooking(requests, serviceRequest) {
  const booking = findElementById(
    "https://onerecord.iata.org/ns/cargo#Booking",
    serviceRequest.body.service,
    requests
  );
  if (!booking) {
    console.warn("Could not find Booking with id", serviceRequest.body.service);
  }
  return booking;
}

function retrieveActivities(requests, booking) {
  return booking.body[
    "https://onerecord.iata.org/ns/cargo#activitySequences"
  ].map((activity) => {
    console.log(activity);
    return findElementById(
      "https://onerecord.iata.org/ns/cargo#TransportMovement",
      activity["https://onerecord.iata.org/ns/cargo#activity"]["@id"],
      requests
    );
  });
}
