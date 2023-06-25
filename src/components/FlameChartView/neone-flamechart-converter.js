import loService from "@/service/lo.service";
import appTheme from "@/theme";
import { retrieveNEOneAssociations } from "./neone-data-linker";

export function generateNEOneFlamechartRoot(requests, serviceRequest) {
  const data = retrieveNEOneAssociations(requests, serviceRequest);
  return generateNEOneFlamechart(
    data.serviceRequest,
    data.waybill,
    data.booking,
    data.activities,
    data.actions,
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
export function generateNEOneFlamechart(
  serviceRequest,
  waybill,
  booking,
  activities,
  actions,
  requests
) {
  if (!serviceRequest) {
    return undefined;
  }

  const root = defaultSpan(serviceRequest);
  root.name += `${serviceRequest.body.serviceName} by ${serviceRequest.body.requestor.partyName}`;

  if (!waybill) {
    return root;
  }

  const fgWaybill = defaultSpan(waybill);
  root.children = [fgWaybill];

  const fgBooking = defaultSpan(booking);
  fgWaybill.children = [fgBooking];

  // Has many activities
  let totalSubchildrenSize = activities.length;
  const fgActivities = activities.map((activity, index) => {
    console.log(activity);
    const fgActivity = defaultSpan(activity);
    fgActivity.backgroundColor = executionStatusColor(
      booking.body.executionStatus
    );

    // Actions here
    /*if (innerServicesRequests[index]) {
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
    }*/

    return fgActivity;
  });
  fgBooking.children = fgActivities;

  const size = totalSubchildrenSize === 0 ? 1 : totalSubchildrenSize;

  root.value = size;
  fgWaybill.value = size;
  fgBooking.value = size;

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
      return palette.info.light;
    case "STARTED":
      return palette.primary.main;
    case "FINISHED":
      return palette.success.main;
    default:
      return palette.error.main;
  }
}
