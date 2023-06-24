import { AccessDeniedWrapper, Map, MapContext, MobileWrapper, Page } from "../../components";

export async function getServerSideProps() {
  const mapboxAccessToken = process.env.MAPBOX_TOKEN;

  return { props: { mapboxAccessToken } };
}


export default ({ mapboxAccessToken }) => {
  return (
    <Page pageTitle="Protected">
      <AccessDeniedWrapper>
        <MobileWrapper  >
          <MapContext.Provider value={{ mapboxAccessToken }}>
            <Map />
          </MapContext.Provider>
        </MobileWrapper>
      </AccessDeniedWrapper>
    </Page>
  );
}
