import Link from "next/link";
import { AccessDeniedWrapper, MobileWrapper, Page } from "../../components";
import { Alert, Button, Card, Paper, Typography } from "@mui/material";



export default ({ }) => {
  return (
    <Page pageTitle="ONE GHA">
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
              <Typography variant="h5" component="div" sx={{fontWeight: "bold"}}>
                New mission
              </Typography>
              <Typography
                sx={{ marginBottom: "0.5rem" }}
                color="text.secondary">
                Goods movement
              </Typography>
              <Typography variant="subtitle2">
                From: Aircraft
              </Typography>
              <Typography variant="subtitle2">
                To:  Warehouse 529 Frachtumschlaghalle Fraport
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
                <Button
                  variant="contained"
                  component={Link}
                  href="/mobilemap/0"
                  style={{

                  }}
                >
                  Start misison
                </Button>
              </div>

            </Card>

          </div>
        </MobileWrapper>
      </AccessDeniedWrapper >
    </Page >
  );
}
