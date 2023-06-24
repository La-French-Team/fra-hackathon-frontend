import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import {
  AppBar,
  Button,
  IconButton,
  Switch,
  Toolbar,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import { ColorModeContext } from "../ColorModeContext";

/**
 *
 * @param {Object} params
 * @param {String} params.pageTitle
 */
const Component = ({ pageTitle = "Page" }) => {
  const { data: session } = useSession();
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  return (
    <AppBar position="static">
      <Toolbar
        disableGutters
        sx={{ display: "flex", justifyContent: "space-between" }}
      >
        <span style={{ display: "flex", alignItems: "center" }}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{
              display: { xs: "none", md: "flex" },
              maxHeight: "50px",
              mr: 1,
              ml: 1,
            }}
            component={Link}
            href="/"
          >
            <Image
              src="/one_record.png"
              alt="Home logo"
              width={42}
              height={24}
              priority
            />
          </IconButton>
          <Typography
            noWrap
            variant="h4"
            component="div"
            sx={{ flexGrow: 0, mr: 1 }}
          >
            {pageTitle}
          </Typography>
        </span>
        <span style={{ display: "flex", alignItems: "center" }}>
          <Switch
            checked={theme.palette.mode === "dark"}
            checkedIcon={<Brightness4Icon fontSize={"small"} />}
            icon={<Brightness7Icon fontSize={"small"} />}
            onChange={colorMode.toggleColorMode}
          />

          {!!session ? (
            <>
              <Typography sx={{ mr: "0.5rem" }} variant="h6">
                {session?.user?.name}
              </Typography>
              <Button
                variant="outlined"
                onClick={() => signOut()}
                sx={{ mr: 1, color: "white", borderColor: "white" }}
              >
                Sign out
              </Button>
            </>
          ) : (
            <Button
              variant="outlined"
              onClick={() => signIn("zitadel")}
              sx={{ mr: 1, color: "white", borderColor: "white" }}
            >
              Sign in
            </Button>
          )}
        </span>
      </Toolbar>
    </AppBar>
  );
};

export default Component;
