import { Paper } from "@mui/material";
import { useSession } from "next-auth/react";
import useResizeObserver from "use-resize-observer";
import { FlameGraph } from "./FlameChart";
import loService from "@/service/lo.service";

const data = {
  name: "root",
  value: 5,
  children: [
    {
      name: "custom tooltip",
      value: 1,

      // Each node can specify a "tooltip" to be shown on hover.
      // By default, the node's "name" will be used for this.
      tooltip: "Custom tooltip shown on hover",
    },
    {
      name: "custom colors",

      // Each node can also provide a custom "backgroundColor" or text "color".
      backgroundColor: "#35f",
      color: "#fff",

      value: 3,
      children: [
        {
          name: "leaf",
          value: 2,
        },
      ],
    },
  ],
};

function transform(results, session) {
  if (results == null) {
    return {
      name: "loading",
      value: 1,
    };
  }

  // 1. Service Request - ExecutionPlan
  // 2. Service - ExecutionPlan
  // 3. Activity - 1 Execution Plan - Sequence Number
  // 4. Loop

  if (results?.length == 0) {
    return {}
  }

  /**
   * @type Array
   */
  const requests = results[0].requests;
  const serviceRequest = requests.find((req) => req.type === "ServiceRequest");
  const service = requests.find((req) => req.type === "Service");
  const activities = requests
    .filter((req) => req.type === "Activity")
    .sort((req) => req.body.sequenceNumber);

  const flamegraph = {
    name: formatName(serviceRequest, session),
    id: serviceRequest?.params?.id,
    uri: loService.getUri(serviceRequest),
    value: activities.length,
    children: [
      {
        name: formatName(service, session),
        value: activities.length,
        id: activities,
        uri: loService.getUri(service),
        children: activities.map((activity) => ({
          name: formatName(activity, session),
          value: 1,
          uri: loService.getUri(activity),
        })
        ),
      },
    ],
  };

  return flamegraph;
}

function formatName(request, session) {
  return `${request.type} - ${request.params.id.replace(
    `_${session.data.user.email}`,
    ""
  )}`;
}

const Flamechart = ({ style, results, onSpanClick }) => {
  const { ref, width = 1, height = 1 } = useResizeObserver();
  const session = useSession();
  const realdata = transform(results, session);

  return (
    <Paper ref={ref} style={{ ...style }} variant="outlined">
      {results?.length > 0 &&
        <FlameGraph
          data={realdata}
          height={height}
          width={width}
          onChange={(node) => {
            onSpanClick(node);
          }}
          onMouseOver={(event, itemData) => {
            // console.log(event, itemData);
          }}
          onMouseOut={(event, itemData) => {
            //console.log(event, itemData);
          }}
        />}
    </Paper>
  );
};

export default Flamechart;
