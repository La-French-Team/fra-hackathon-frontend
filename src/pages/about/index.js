import { AppBar, Body } from "../../components";

export default function About() {
  return (
    <main>
      <AppBar pageTitle="About" />
      <Body>
        <section>
          <h4>The project:</h4>
          <p>
            The project presented by the french team for the IATA ONE Record
            Hackathon (hosted by Lufthansa Cargo).
          </p>
        </section>
        <section>
          <h4>The team:</h4>
          <ul>
            <li>Alex Couvreur</li>
            <li>Alexandre Hiltcher</li>
            <li>Florian Maunier</li>
            <li>Christophe Maurin</li>
            <li>Thomas Moreau</li>
            <li>Aurélien Largeau</li>
          </ul>
        </section>
      </Body>
    </main>
  );
}
