import Link from "next/link";
import { AccessDeniedWrapper, MobileWrapper, Page } from "../../components";
import { Alert, Button, Card, Paper, Typography } from "@mui/material";
import { useState } from "react";



export default ({ }) => {
  const [missionStarted, setMissionStarted] = useState(false);

  return (
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
                {missionStarted
                  ? <Button
                    variant="contained"
                    onClick={() => setMissionStarted(true)}
                    style={{

                    }}
                  >
                    Pick up goods
                  </Button>
                  : <Button
                    variant="contained"
                    component={Link}
                    href="/"
                    style={{

                    }}
                  >
                    Deliver goods
                  </Button>}
              </div>

            </Card>

          </div>
        </MobileWrapper>
      </AccessDeniedWrapper >
    </Page >
  );
}
