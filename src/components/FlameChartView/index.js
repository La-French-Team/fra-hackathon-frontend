import { Paper } from "@mui/material";
import { useSession } from "next-auth/react";
import useResizeObserver from "use-resize-observer";
import { FlameGraph } from "./FlameChart";

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
    value: activities.length,
    children: [
      {
        name: formatName(service, session),
        value: activities.length,
        id: activities,
        children: activities.map((activity) => {
          return { name: formatName(activity, session), value: 1 };
        }),
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

const Flamechart = ({ style, results }) => {
  const { ref, width = 1, height = 1 } = useResizeObserver();
  const session = useSession();
  const realdata = transform(results, session);
  console.log("realdata",realdata)

  return (
    <Paper ref={ref} style={{ ...style }} variant="outlined">
      <FlameGraph
        data={realdata}
        height={height}
        width={width}
        onChange={(node) => {
          console.log(`"${JSON.stringify(node)}" focused`);
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
