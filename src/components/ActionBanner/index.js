import call from "@/backend/backend";
import { Button, Paper } from "@mui/material";
import { useSession } from "next-auth/react";

const ActionBanner = ({ style, onDataChange }) => {
  const session = useSession();

  return (
    <Paper style={{
      ...style,
      width: "100%",
      display: "flex",
      justifyContent: "space-around",
      alignItems: "stretch"
    }} variant="outlined">
      <Button onClick={async () => onDataChange(await call("init", session))}>
        Init
      </Button>
      <Button onClick={async () => onDataChange(await call("nextStep", session))}>
        Next step
      </Button>
      <Button onClick={async () => onDataChange(await call("current", session))}>
        Get
      </Button>
      <Button onClick={async () => onDataChange(await call("reset", session))}>
        Reset
      </Button>
    </Paper>
  );
};

export default ActionBanner;
