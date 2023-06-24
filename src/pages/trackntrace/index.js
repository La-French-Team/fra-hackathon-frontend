import {
  AccessDeniedWrapper,
  DetailsView,
  FlameChartView,
  Page,
  TimeLineView,
} from "../../components";

export default function TrackNTrace({ }) {
  return (
    <Page pageTitle="Track & Trace">
      <AccessDeniedWrapper>
        <div style={{
          height: "100%",
          display: "flex",
          flexDirection: "column"
        }}>
          <FlameChartView style={{
            flex: "1 1 auto",
          }} />
          <div style={{
            minHeight: "50%",
            maxHeight: "50%",
            flex: "1 1 auto",
            display: "flex"
          }} >
            <DetailsView style={{ height: "100%", width: "50%", flex: "1 1 auto" }} />
            <TimeLineView style={{
              height: "100%",
              width: "50%",
              flex: "1 1 auto",
            }} />
          </div>
        </div>
      </AccessDeniedWrapper>
    </Page>
  );
}
