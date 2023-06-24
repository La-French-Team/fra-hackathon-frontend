import { Paper } from "@mui/material";
import { useSession } from "next-auth/react";
import { FlameGraph } from "react-flame-graph";
import useResizeObserver from "use-resize-observer";

const loadingFlameGraph = {
  name: "loading",
  value: 1,
};

// 1. Service Request - ExecutionPlan
// 2. Service - ExecutionPlan
// 3. Activity - 1 Execution Plan - Sequence Number
// 4. Loop
function transform(results, session) {
  if (results == null) {
    return loadingFlameGraph;
  }

  /**
   * @type Array
   */
  const requests = results[0].requests;

  // 1. Find the first ServiceRequest issued by the customer (seller)
  const serviceRequest = requests.find(
    (req) =>
      req.type === "ServiceRequest" &&
      req.body.parentActivities[0].includes("seller")
  );
  if (!serviceRequest) {
    console.warn(
      "Could not find ServiceRequest with parent activity that starts with seller"
    );
    return;
  }

  // 2. Find the service that related to the service request
  const serviceId = stringAfter(serviceRequest.body.service, "/");
  const service = findElementById("Service", serviceId, requests);
  if (!service) {
    console.warn("Could not find Service with id", serviceId);
    return;
  }

  console.log("The service", service);
  // 3. Find the linked activities
  const activities = service.body.activities
    .map((activityId) =>
      findElementById("Activity", stringAfter(activityId, "/"), requests)
    )
    .sort((req) => req.body.sequenceNumber);
  if (activities.length === 0) {
    console.log(
      "Found 0 activities related to service",
      serviceId,
      service.body.activities
    );
  }

  console.log("the activities", activities);

  // 4. Loop on the Service Requests from the activities
  const flamegraph = {
    name: formatName(serviceRequest, session),
    value: activities.length,
    children: [
      {
        name: formatName(service, session),
        value: activities.length,
        children: activities.map((activity) => {
          return {
            name: formatName(activity, session),
            value: 1,
            children: [
              transformInner(
                findElementById(
                  "ServiceRequest",
                  stringAfter(activity.params.id, "/"),
                  requests
                ),
                requests,
                session
              ),
            ],
          };
        }),
      },
    ],
  };

  console.log(flamegraph);

  return flamegraph;
}

function transformInner(serviceRequest, requests, session) {
  if (!serviceRequest) {
    return {
      name: "empty",
      value: 1,
    };
  }
  // 1. Find the service that related to the service request
  const serviceId = stringAfter(serviceRequest.body.service, "/");
  const service = findElementById("Service", serviceId, requests);
  if (!service) {
    console.warn("Could not find Service with id", serviceId);
    return {
      name: formatName(serviceRequest, session),
      value: 1,
    };
  }
  console.log("Found service for", serviceId, service);

  // 2. Find associated activities
  const activities = service.body.activities
    .map((activityId) =>
      findElementById("Activity", stringAfter(activityId, "/"), requests)
    )
    .sort((req) => req.body.sequenceNumber);
  if (activities.length === 0) {
    console.log(
      "Found 0 activities related to service",
      serviceId,
      service.body.activities
    );
  }

  const flamegraph = {
    name: formatName(serviceRequest, session),
    value: 1,
    children: service
      ? [
          {
            name: formatName(service, session),
            value: 1,
            children: activities.map((activity) => {
              transformInner(
                findElementById(
                  "ServiceRequest",
                  stringAfter(activity.params.id, "/"),
                  requests
                ),
                requests,
                session
              );
            }),
          },
        ]
      : [],
  };

  return flamegraph;
}

function findElementById(type, id, list) {
  const found = list.find((req) => req.type === type && req.params?.id === id);
  console.log("Looking for", id, "and found", found);
  return found;
}

/**
 *
 * @param {string} original
 * @param {string} lastSeparator
 * @returns
 */
function stringAfter(original, lastSeparator) {
  return original.substring(original.lastIndexOf(lastSeparator) + 1);
}

function formatName(request, session) {
  return `${request?.type} - ${request?.params?.id.replace(
    `_${session.data.user.email}`,
    ""
  )}`;
}

const Flamechart = ({ style, results }) => {
  const { ref, width = 1, height = 1 } = useResizeObserver();
  const session = useSession();
  const realdata = transform(results, session) || loadingFlameGraph;

  return (
    <Paper ref={ref} style={{ ...style }} variant="outlined">
      <FlameGraph
        data={realdata}
        height={height}
        width={width}
        onChange={(node) => {
          //console.log(`"${node.name}" focused`);
        }}
        onMouseOver={(event, itemData) => {
          // console.log(event, itemData);
        }}
        onMouseOut={(event, itemData) => {
          //console.log(event, itemData);
        }}
      />
    </Paper>
  );
};

export default Flamechart;
