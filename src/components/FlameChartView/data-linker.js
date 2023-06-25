// Converts SDL and NE:ONE data to Flamechart

import { retrieveNEOneAssociations } from "./neone-data-linker";
import { stringAfter } from "./string-utils";

// Retrieve all associations through IDs...
export function retrieveAssociations(requests, serviceRequest) {
  if (serviceRequest.body.service.includes("neone")) {
    return retrieveNEOneAssociations(requests, serviceRequest);
  }
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
  const service = findElementById(
    "Service",
    serviceRequest.body.service,
    requests
  );
  if (!service) {
    console.warn("Could not find Service with id", serviceRequest.body.service);
  }
  return service;
}

function retrieveActivitiesFromService(requests, service) {
  return service.body.activities
    .map((activityId) => findElementById("Activity", activityId, requests))
    .sort((req) => req.body.sequenceNumber);
}

function retrieveServiceRequestsFromActivities(requests, activities) {
  return activities.map((activity) =>
    findElementById("ServiceRequest", activity.params.id, requests)
  );
}

export function findElementById(type, id, list) {
  const found = list.find(
    (req) =>
      req.type === type &&
      stringAfter(req.params?.id, "/") === stringAfter(id, "/")
  );
  console.log("Looking for", id, "and found", found);
  return found;
}
