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
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Typography variant="h1" sx={{ m: 2 }}>
        Access Denied
      </Typography>
      <p>
        <Button
          variant="contained"
          color="error"
          onClick={() => signIn("zitadel")}
          sx={{ m: 1 }}
        >
          You must be signed in to view this page
        </Button>
      </p>
    </Box>
  );
}

export { AccessDeniedWrapper };
