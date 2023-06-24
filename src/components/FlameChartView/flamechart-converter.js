import loService from "@/service/lo.service";
import {
  retrieveAssociations,
  retrieveRootServiceRequest,
} from "./data-linker";

export function generateFlamechartFromRoot(requests) {
  // 1. Find the first ServiceRequest issued by the customer (seller)
  const serviceRequest = retrieveRootServiceRequest(requests);
  const data = retrieveAssociations(requests, serviceRequest);
  return generateFlamechart(
    data.serviceRequest,
    data.service,
    data.activities,
    data.innerServicesRequests,
    requests
  );
}

/**
 *
 * @param {Object} serviceRequest
 * @param {Object} service
 * @param {Array} activities
 * @param {Array} innerServicesRequests
 */
function generateFlamechart(
  serviceRequest,
  service,
  activities,
  innerServicesRequests,
  requests
) {
  if (!serviceRequest) {
    return undefined;
  }
  const root = defaultSpan(serviceRequest);
  root.name += `${serviceRequest.body.serviceName} by ${serviceRequest.body.requestor.partyName}`;

  // Has only one service
  const fgService = defaultSpan(service);
  if (!service) {
    return root;
  }
  fgService.name += `${service.body.serviceName} by ${service.body.provider.partyName} `;
  root.children = [fgService];

  // Has many activities
  let totalSubchildrenSize = activities.length;
  const fgActivities = activities.map((activity, index) => {
    const fgActivity = defaultSpan(activity);
    fgActivity.name += `${activity.body.activityName}`;

    // The inner service request might not exist
    if (innerServicesRequests[index]) {
      const innerAssociations = retrieveAssociations(
        requests,
        innerServicesRequests[index]
      );

      const fgServiceRequest = generateFlamechart(
        innerAssociations.serviceRequest,
        innerAssociations.service,
        innerAssociations.activities,
        innerAssociations.innerServicesRequests,
        requests
      );
      fgActivity.children = [fgServiceRequest];
    }

    return fgActivity;
  });
  fgService.children = fgActivities;

  const size = totalSubchildrenSize === 0 ? 1 : totalSubchildrenSize;
  root.value = size;
  fgService.value = size;

  return root;
}

// Default span from any entry
function defaultSpan(object) {
  console.log(`${object?.type} - ${object?.params?.id}`, object);
  return {
    name: `${object?.type} - `,
    value: 1,
    children: [],
    // Extra properties for enhanced interactions
    loid: object?.params?.id,
    uri: loService.getUri(object),
    type: object?.type,
  };
}
