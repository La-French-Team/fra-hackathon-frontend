import { FlameGraph } from "react-flame-graph";
import useResizeObserver from "use-resize-observer";

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

const Flamechart = ({ style }) => {
  const { ref, width = 1, height = 1 } = useResizeObserver();

  return (
    <div ref={ref} style={{ ...style }}>
      <FlameGraph
        data={data}
        height={height}
        width={width}
        onChange={(node) => {
          console.log(`"${node.name}" focused`);
        }}
        onMouseOver={(event, itemData) => {
          console.log(event, itemData);
        }}
        onMouseOut={(event, itemData) => {
          console.log(event, itemData);
        }}
      />
    </div>
  );
};

export default Flamechart;
