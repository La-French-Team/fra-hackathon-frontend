import { AppBar, Body } from "@/components";
import { Container, Typography } from "@mui/material";

export default function Home() {
  return (
    <>
      <AppBar pageTitle="Home" />
      <Body>
        <Container maxWidth="xl" sx={{ backgroundColor: "white" }}>
          <Typography
            fontFamily="Roboto"
            color="primary"
            variant="h4"
            component="span"
          >
            ONE
          </Typography>
          <Typography
            fontFamily="Roboto"
            color="secondary"
            variant="h4"
            component="span"
          >
            RECORD
          </Typography>
          <Typography fontFamily="Roboto" variant="h4" component="span">
            .FR
          </Typography>
        </Container>
      </Body>
    </>
  );
}
