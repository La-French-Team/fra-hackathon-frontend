import call from "@/backend/backend";
import { Button, Paper } from "@mui/material";
import { useSession } from "next-auth/react";
import { useContext } from "react";
import { ApiContext } from "../ApiContext";

const ActionBanner = ({ style, onDataChange }) => {
  const session = useSession();
  const { apiUrl } = useContext(ApiContext);

  return (
    <Paper
      style={{
        ...style,
        width: "100%",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "stretch",
      }}
      variant="outlined"
    >
      <Button
        onClick={async () => onDataChange(await call(apiUrl, "init", session))}
      >
        Init
      </Button>
      <Button
        onClick={async () =>
          onDataChange(await call(apiUrl, "nextStep", session))
        }
      >
        Next step
      </Button>
      <Button
        onClick={async () =>
          onDataChange(await call(apiUrl, "current", session))
        }
      >
        Get
      </Button>
      <Button
        onClick={async () => onDataChange(await call(apiUrl, "reset", session))}
      >
        Reset
      </Button>
    </Paper>
  );
};

export default ActionBanner;
