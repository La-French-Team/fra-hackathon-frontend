import {
  AccessDeniedWrapper,
  DetailsView,
  FlameChartView,
  Page,
  TimeLineView,
} from "../components";

export default function TrackNTrace({ }) {
  return (
    <Page>
      <AccessDeniedWrapper>
        <div style={{
          height: "100%",
          display: "flex",
          flexDirection: "column"
        }}>
          <FlameChartView style={{
            minHeight: "30%",
            height: 0,
            flex: "1 1 auto",
          }} />
          <div style={{
            height: 0,
            minHeight: "50%",
            flex: "2 1 auto",
            display: "flex"
          }} >
            <DetailsView style={{
              height: "100%",
              width: "50%",
              flex: "1 1 auto"
            }} />
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
