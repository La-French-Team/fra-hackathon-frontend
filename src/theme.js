import { red } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

// Create a theme instance.
const appTheme = (mode) =>
  createTheme({
    palette: {
      mode,
      primary: {
        main: "#1e32fa",
      },
      secondary: {
        main: "#FECD45",
      },
      error: {
        main: red.A400,
      },
      background: {
        main: "#ffffff80",
      },
    },
  });

export default appTheme;
