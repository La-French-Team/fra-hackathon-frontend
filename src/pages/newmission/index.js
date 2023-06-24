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
            justifyContent: "space-between"
          }}>
            <span>
              <Typography variant="h6">
                New mission:
              </Typography>
              <Card sx={{ marginTop: "3rem" }}>
                <Typography
                  sx={{ margin: "0.5rem 0.5rem 1rem 0.5rem" }}>
                  Handling
                </Typography>
                <Paper
                  sx={{ p: "0.5rem" }}
                  variant="outlined">
                  <Typography variant="subtitle2">
                    From: 
                    <Typography component="span" sx={{fontWeight:"bold"}}> Aircraft</Typography>
                  </Typography>
                  <Typography variant="subtitle2">
                    To: <Typography component="span" sx={{fontWeight:"bold"}}> Warehouse 529 Frachtumschlaghalle Fraport</Typography>
                  </Typography>
                </Paper>

                <Typography
                  sx={{ margin: "2rem 0.5rem 1rem 0.5rem" }}
                  variant="body2">
                  Total ULD: 1
                </Typography>
              </Card>
            </span>

            <Button
              variant="contained"
              component={Link}
              href="/mobilemap/0">
              Start misison
            </Button>
          </div>
        </MobileWrapper>
      </AccessDeniedWrapper>
    </Page>
  );
}
