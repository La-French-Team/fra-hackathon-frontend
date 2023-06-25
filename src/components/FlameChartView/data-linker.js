// Converts SDL and NE:ONE data to Flamechart

import { stringAfter } from "./string-utils";

// Retrieve all associations through IDs...
export function retrieveAssociations(requests, serviceRequest) {
  // 2. Find the service that related to the service request
  const service = retrieveServiceFromRequest(requests, serviceRequest);

  // 3. Find the linked activities
  const activities = service
    ? retrieveActivitiesFromService(requests, service)
    : []; // If the service is not found, default to empty activities


  // 4. Find inner service requests from activities
  // The link is 1 - 1, so index i on activities has the associated service request
  // on the innerServicesRequests also at i
  const innerServicesRequests = retrieveServiceRequestsFromActivities(
    requests,
    activities
  );

  return {
    serviceRequest,
    service,
    activities,
    innerServicesRequests,
  };
}

export function retrieveRootServiceRequest(requests) {
  return requests.find(
    (req) =>
      req.type === "ServiceRequest" &&
      req.body.parentActivities[0].includes("seller")
  );
}

function retrieveServiceFromRequest(requests, serviceRequest) {
  const serviceId = stringAfter(serviceRequest.body.service, "/");
  const service = findElementById("Service", serviceId, requests);
  if (!service) {
    console.warn("Could not find Service with id", serviceId);
  }
  return service;
}

function retrieveActivitiesFromService(requests, service) {
  return service.body.activities
    .map((activityId) =>
      findElementById("Activity", stringAfter(activityId, "/"), requests)
    )
    .sort((req) => req.body.sequenceNumber);
}

function retrieveServiceRequestsFromActivities(requests, activities) {
  return activities.map((activity) =>
    findElementById(
      "ServiceRequest",
      stringAfter(activity.params.id, "/"),
      requests
    )
  );
}

function findElementById(type, id, list) {
  const found = list.find((req) => req.type === type && req.params?.id === id);
  return found;
}
