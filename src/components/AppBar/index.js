import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import Image from "next/image";
import pages from "./pages";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

/**
 *
 * @param {Object} params
 * @param {String} params.pageTitle
 */
const Component = ({ pageTitle = "Page" }) => {
  const { data: session } = useSession();

  return (
    <AppBar position="static">
      <Toolbar disableGutters>
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
        <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
          {pages
            .filter((page) => !page.hidden)
            .filter((page) => !page.protected || !!session)
            .map((page) => (
              <Button
                key={page.path}
                alt={page.alt}
                // onClick={handleCloseNavMenu}
                sx={{ color: "white", display: "block", m: "0 0.5rem" }}
                component={Link}
                href={page.path}
              >
                {page.title}
              </Button>
            ))}
        </Box>

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
            onClick={() => signIn()}
            sx={{ mr: 1, color: "white", borderColor: "white" }}
          >
            Sign in
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Component;
