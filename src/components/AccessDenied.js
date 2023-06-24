import { Box, Button, Typography } from "@mui/material";
import { signIn, useSession } from "next-auth/react";

const AccessDeniedWrapper = ({ children }) => {
  const { data: session } = useSession();

  if (session) {
    return children;
  } else {
    return <AccessDenied />;
  }
};

export default function AccessDenied() {
  return (
    <Box
      sx={{ pt:"5rem",display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Typography variant="h3" sx={{ m: 2 }}>
        You must log in to access this page
      </Typography>
      <p>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => signIn("zitadel")}
          sx={{ m: 1 }}
        >
          Log in
        </Button>
      </p>
    </Box>
  );
}

export { AccessDeniedWrapper };
