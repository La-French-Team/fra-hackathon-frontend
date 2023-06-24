import { AccessDeniedWrapper, MobileWrapper, Page } from "../../components";

export async function getServerSideProps() {
  const mapboxAccessToken = process.env.MAPBOX_TOKEN;

  return { props: { mapboxAccessToken } };
}


export default ({ mapboxAccessToken }) => {
  return (
    <Page pageTitle="Protected">
      <AccessDeniedWrapper>
        <MobileWrapper mapboxAccessToken={mapboxAccessToken} />
      </AccessDeniedWrapper>
    </Page>
  );
}
