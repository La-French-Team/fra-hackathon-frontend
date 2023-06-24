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
} from "../../components";

export async function getServerSideProps() {
  const apiUrl = process.env.API_URL;

  return { props: { apiUrl } };
}

export default function TrackNTrace({ apiUrl }) {
  const [results, setResults] = useState(null);
  const [detailsUri, setDetailsUri] = useState(null);

  const onDataChange = (results) => {
    setResults(results)
    if (results?.length == 0) {
      return setDetailsUri(null)
    }
    const serviceRequest = results[0]?.requests.find(el => el?.type === "ServiceRequest");
    if (serviceRequest) {
      if (serviceRequest?.params?.id) {
        setDetailsUri(loService.getUriFromSDLObject(serviceRequest));
      } else {
        setDetailsUri(loService.getUriFromNeOneObject(serviceRequest));
      }
    }
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
                minHeight: "7%",
                maxHeight: "7%",
                flex: "1 1 auto",
                display: "flex",
              }}
            >
              <ActionBanner onDataChange={onDataChange} />
            </div>
            <FlameChartView
              style={{
                flex: "1 1 auto",
              }}
              results={results}
              onSpanClick={onSpanClick}
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
                uri={detailsUri}
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
    </ApiContext.Provider>
  );
}
