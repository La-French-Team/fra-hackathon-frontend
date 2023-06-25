import Link from "next/link";
import { AccessDeniedWrapper, MobileWrapper, Page } from "../../components";
import { Alert, Button, Card, Paper, Typography } from "@mui/material";
import { useState } from "react";
import call from "@/backend/backend";
import { ApiContext } from "@/components/ApiContext";
import { LoadingButton } from "@mui/lab";
import { useSession } from "next-auth/react";

export async function getServerSideProps() {
  const apiUrl = process.env.API_URL;

  return { props: { apiUrl } };
}


export default ({ apiUrl }) => {
  const session = useSession();
  const [loading, setLoading] = useState(false)
  // const { apiUrl } = useContext(ApiContext);
  const [missionStarted, setMissionStarted] = useState(false);

  const onDropOff = () => {
    setLoading(true)
    call(apiUrl, "nextStep", session).then(() => {
      router.push("/")
    })
  }

  return (
    <ApiContext.Provider value={{ apiUrl }}>
      <Page pageTitle="ONE ROAD">
        <AccessDeniedWrapper>
          <MobileWrapper >
            <div style={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "stretch",
              justifyContent: "center",
            }}>
              <Card
                elevation={4}
                sx={{ padding: "0.5rem" }}
                variant="elevation">
                <Typography variant="h5" component="div" sx={{ fontWeight: "bold" }}>
                  New mission
                </Typography>
                <Typography
                  sx={{ marginBottom: "0.5rem" }}
                  color="text.secondary">
                  Last mile
                </Typography>
                <Typography variant="subtitle2">
                  From: warehouse
                </Typography>
                <Typography variant="subtitle2">
                  To:  TDB
                </Typography>

                <Typography
                  sx={{ marginTop: "0.5rem" }}
                  variant="body2">
                  Total ULD: 1
                </Typography>
                <div
                  style={{
                    marginTop: "2rem",
                    display: "flex",
                    justifyContent: "center"
                  }}>
                  {!missionStarted
                    ? <Button
                      variant="outlined"
                      onClick={() => setMissionStarted(true)}
                    >
                      Pick up goods
                    </Button>
                    : <LoadingButton
                      loading={loading}
                      disabled={loading}
                      variant="contained"
                      onClick={onDropOff}
                    >
                      Deliver goods
                    </LoadingButton>}
                </div>

              </Card>

            </div>
          </MobileWrapper>
        </AccessDeniedWrapper >
      </Page >
    </ApiContext.Provider>
  );
}
