import { findElementById } from "./data-linker";

// NE: One service requests are linked between SDL and NE:One through ONE Record service link
export function retrieveNEOneAssociations(requests, serviceRequest) {
  // 2. Find the service that related to the service request
  const service = retrieveBooking(requests, serviceRequest);

  // 3. Find the linked activities
  const activities = service ? retrieveActivities(requests, service) : []; // If the service is not found, default to empty activities

  return {
    serviceRequest,
    service,
    activities,
    innerServicesRequests: [],
  };
}

function retrieveBooking(requests, serviceRequest) {
  const booking = findElementById(
    "https://onerecord.iata.org/ns/cargo#Booking",
    serviceRequest.body.service,
    requests
  );
  console.log(requests);
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
