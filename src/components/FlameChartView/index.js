import { Paper } from "@mui/material";
import useResizeObserver from "use-resize-observer";
import { FlameGraph } from "./FlameChart";
import { generateFlamechartFromRoot } from "./flamechart-converter";

const Flamechart = ({ style, results, onSpanClick }) => {
  const { ref, width = 1, height = 1 } = useResizeObserver();
  const realdata = results?.[0]?.requests
    ? generateFlamechartFromRoot(results?.[0]?.requests)
    : { name: "loading", value: 1 };

  console.log("realdata", realdata);

  return (
    <Paper ref={ref} style={{ ...style }} variant="outlined">
      {results?.length > 0 && (
        <FlameGraph
          data={realdata}
          height={height * 0.95}
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
        />
      )}
    </Paper>
  );
};

export default Flamechart;
