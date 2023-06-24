import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

// Create a theme instance.
const theme = createTheme({
  palette: {
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

export default theme;
