import call from "@/backend/backend"
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material"
import Link from "next/link"
import { useContext } from "react";
import { useSession } from "next-auth/react";
import { MapContext } from "../MapContext";

export default ({ open, onClose }) => {
  const session = useSession();
  const { apiUrl } = useContext(MapContext);

  const onDropOff = () => {
    call(apiUrl, "nextStep", session).then(onClose)
  }

  return <Dialog open={open}>
    <DialogTitle sx={{ m: 0, p: 2 }}>
      Drop off Import zone
    </DialogTitle>
    <DialogContent dividers>
      <Typography gutterBottom>
        Drop ULDs
      </Typography>
      <Typography gutterBottom>
        ID: <Typography
          component="span"
          sx={{ fontWeight: "bold" }}> 12345</Typography>
      </Typography>
    </DialogContent>
    <DialogActions sx={{ display: "flex", justifyContent: "center" }}>
      <Button
        variant="contained"
        autoFocus
        component={Link}
        href="/"
        onClick={onDropOff}
      >
        CONFIRM
      </Button>
    </DialogActions>
  </Dialog >
}