import { AccessDeniedWrapper, Map, MapContext, Page } from "../../components";

export async function getServerSideProps() {
  const mapboxAccessToken = process.env.MAPBOX_TOKEN;

  return { props: { mapboxAccessToken } };
}

export default function About({ mapboxAccessToken }) {
  return (
    <Page pageTitle="Protected">
      <AccessDeniedWrapper>
        <MapContext.Provider value={{ mapboxAccessToken }}>
          <Map />
        </MapContext.Provider>
      </AccessDeniedWrapper>
    </Page>
  );
}
