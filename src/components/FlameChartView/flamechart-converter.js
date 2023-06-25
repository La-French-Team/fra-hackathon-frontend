import loService from "@/service/lo.service";
import {
  retrieveAssociations,
  retrieveRootServiceRequest,
} from "./data-linker";
import appTheme from "@/theme";
import { generateNEOneFlamechart } from "./neone-flamechart-converter";
import { alpha } from "@mui/material";

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

  if (serviceRequest.body.service.includes("neone")) {
    return generateNEOneFlamechart(
      serviceRequest,
      service,
      activities,
      requests
    );
  }

  const root = defaultSpan(serviceRequest);
  root.name += `${serviceRequest.body.serviceName} by ${serviceRequest.body.requestor.partyName}`;

  // Has only one service
  const fgService = defaultSpan(service);
  if (!service) {
    return root;
  }
  fgService.name += `${service.body.serviceName} by ${service.body.provider.partyName} `;
  fgService.backgroundColor = executionStatusColor(
    service.body.executionStatus
  );
  root.children = [fgService];

  // Has many activities
  let totalSubchildrenSize = activities.length;
  const fgActivities = activities.map((activity, index) => {
    const fgActivity = defaultSpan(activity);
    fgActivity.name += `${activity.body.activityName}`;
    fgActivity.backgroundColor = executionStatusColor(
      service.body.executionStatus
    );

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
      const innerServiceSize = fgServiceRequest.children[0]?.value || 0;
      totalSubchildrenSize += Math.max(innerServiceSize - 1, 0);
      fgActivity.value = Math.max(innerServiceSize, 1);
    }

    return fgActivity;
  });
  fgService.children = fgActivities;

  const size = totalSubchildrenSize === 0 ? 1 : totalSubchildrenSize;
  root.value = size;
  fgService.value = size;

  return root;
}

/**
 * Service, Activite:
 * NOT_PLANNED -> gris
 * SCHEDULED -> jaune
 * STARTED -> bleu
 * FINISHED -> ?
 *
 */
// Default span from any entry
function defaultSpan(object) {
  return {
    name: `${object?.type} - `,
    value: 1,
    children: [],
    // Extra properties for enhanced interactions
    loid: object?.params?.id,
    uri: loService.getUri(object),
    type: object?.type,
    backgroundColor: appTheme().palette.grey[300],
  };
}

function executionStatusColor(executionStatus) {
  const palette = appTheme().palette;
  switch (executionStatus) {
    case "NOT_PLANNED":
      return palette.grey[500];
    case "SCHEDULED":
      return alpha(palette.info.light, 0.4);
    case "STARTED":
      return alpha(palette.primary.main, 0.4);
    case "FINISHED":
      return alpha(palette.success.main, 0.4);
    default:
      return alpha(palette.error.main, 0.4);
  }
}
