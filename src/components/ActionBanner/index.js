import call from "@/backend/backend";
import { Button, Paper } from "@mui/material";
import { useSession } from "next-auth/react";

const ActionBanner = ({ style, setResults }) => {
  const session = useSession();

  return (
    <Paper style={{ ...style }} variant="outlined">
      <Button onClick={async () => setResults(await call("init", session))}>
        Init
      </Button>
      <Button onClick={async () => setResults(await call("nextStep", session))}>
        Next step
      </Button>
      <Button onClick={async () => setResults(await call("current", session))}>
        Get
      </Button>
      <Button onClick={async () => setResults(await call("reset", session))}>
        Reset
      </Button>
    </Paper>
  );
};

export default ActionBanner;
