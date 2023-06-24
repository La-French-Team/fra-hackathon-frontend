import { Container, Divider, List, ListItem, Typography } from "@mui/material";
import { AppBar, Body } from "../../components";

export default function About() {
  return (
    <main>
      <AppBar pageTitle="About" />
      <Body>
        <Container sx={{pt: "2rem"}}>
          <section>
            <Typography variant="h4">The project</Typography>
            <Typography variant="body2">
              The project presented by the french team for the IATA ONE Record
              Hackathon (hosted by Lufthansa Cargo).
            </Typography>
          </section>
          <section style={{marginTop: "1rem", width: "fit-content"}}>
            <Typography variant="h4">The team</Typography>
            <List>
              <ListItem>Alexis Couvreur</ListItem>
              <Divider/>
              <ListItem>Alexandre Hiltcher</ListItem>
              <Divider/>
              <ListItem>Florian Maunier</ListItem>
              <Divider/>
              <ListItem>Christophe Maurin</ListItem>
              <Divider/>
              <ListItem>Thomas Moreau</ListItem>
              <Divider/>
              <ListItem>Aurélien Largeau</ListItem>
            </List>
          </section>
        </Container>
      </Body>
    </main>
  );
}
