import ActionBanner from "@/components/ActionBanner";
import {
  AccessDeniedWrapper,
  DetailsView,
  FlameChartView,
  Page,
  TimeLineView,
} from "../../components";
import { useState } from "react";

export default function TrackNTrace({}) {
  const [results, setResults] = useState(null);

  return (
    <Page>
      <AccessDeniedWrapper>
        <div
          style={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              minHeight: "7%",
              maxHeight: "7%",
              flex: "1 1 auto",
              display: "flex",
            }}
          >
            <ActionBanner setResults={setResults} />
          </div>
          <FlameChartView
            style={{
              flex: "1 1 auto",
            }}
            results={results}
          />
          <div
            style={{
              minHeight: "50%",
              maxHeight: "50%",
              flex: "1 1 auto",
              display: "flex",
            }}
          >
            <DetailsView
              style={{ height: "100%", width: "50%", flex: "1 1 auto" }}
            />
            <TimeLineView
              style={{
                height: "100%",
                width: "50%",
                flex: "1 1 auto",
              }}
            />
          </div>
        </div>
      </AccessDeniedWrapper>
    </Page>
  );
}
