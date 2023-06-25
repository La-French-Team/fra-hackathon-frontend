import ActionBanner from "@/components/ActionBanner";
import { ApiContext } from "@/components/ApiContext";
import loService from "@/service/lo.service";
import { useState } from "react";
import {
  AccessDeniedWrapper,
  DetailsView,
  FlameChartView,
  Page,
  TimeLineView,
} from "../components";

export async function getServerSideProps() {
  const apiUrl = process.env.API_URL;

  return { props: { apiUrl } };
}

export default function TrackNTrace({ apiUrl }) {
  const [results, setResults] = useState(null);
  const [activeStep, setActiveStep] = useState(null);
  const [detailsUri, setDetailsUri] = useState(null);
  const [dataType, setDataType] = useState(null);
  const [loId, setLoId] = useState(null);

  const onDataChange = (results, activeStep) => {
    setActiveStep(activeStep);
    setResults(results);
    if (results?.length == 0) {
      return setDetailsUri(null);
    }
    let lo = null;
    if (dataType == null)
      lo = results[0]?.requests.find((el) => el?.type === "ServiceRequest");
    if (dataType == "Service")
      lo = results[0]?.requests.find(
        (el) => el?.type === dataType && el?.params?.id == loId
      );
    if (lo) {
      setLoId(lo?.params?.loid);
      setDetailsUri(loService.getUri(lo));
    }
  };

  const onReset = () => {
    setDataType("ServiceRequest");
  };

  const onSpanClick = (node) => {
    setDetailsUri(node.source.uri);
  };

  return (
    <ApiContext.Provider value={{ apiUrl }}>
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
                minHeight: "64px",
                maxHeight: "5%",
                flex: "1 1 auto",
                display: "flex",
              }}
            >
              <ActionBanner onDataChange={onDataChange} onReset={onReset} />
            </div>
            <FlameChartView
              style={{
                flex: "4 1 auto",
                padding: "0.2rem",
                maxHeight: "45%"
              }}
              results={results}
              onSpanClick={onSpanClick}
            />
            <div
              style={{
                minHeight: "40%",
                maxHeight: "50%",
                flex: "6 1 auto",
                display: "flex",
              }}
            >
              <DetailsView
                style={{ height: "100%", width: "50%", flex: "1 1 auto" }}
                uri={detailsUri}
              />
              <TimeLineView
                step={activeStep}
                uri={detailsUri}
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
    </ApiContext.Provider>
  );
}
