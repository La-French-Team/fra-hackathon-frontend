import { ApiContext } from "@/components/ApiContext";
import { AccessDeniedWrapper, Map, MapContext, MobileWrapper, Page } from "../../components";

export async function getServerSideProps() {
  const mapboxAccessToken = process.env.MAPBOX_TOKEN;
  const apiUrl = process.env.API_URL;

  return { props: { mapboxAccessToken, apiUrl } };
}


export default ({ mapboxAccessToken, apiUrl }) => {
  return (
    <Page pageTitle="ONE GROUND">
        <AccessDeniedWrapper>
          <MobileWrapper  >
            <MapContext.Provider value={{ mapboxAccessToken, apiUrl }}>
              <Map />
            </MapContext.Provider>
          </MobileWrapper>
        </AccessDeniedWrapper>
    </Page>
  );
}
