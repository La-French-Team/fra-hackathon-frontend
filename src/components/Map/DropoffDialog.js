import call from "@/backend/backend"
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material"
import { useContext } from "react";
import { useSession } from "next-auth/react";
import { MapContext } from "../MapContext";
import { useRouter } from "next/router";

export default ({ open, onClose }) => {
  const session = useSession();
  const router = useRouter();
  const { apiUrl } = useContext(MapContext);

  const onDropOff = () => {
    call(apiUrl, "nextStep", session).then(() => {
      onClose()
      router.push("/")
    })
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
        onClick={onDropOff}
      >
        CONFIRM
      </Button>
    </DialogActions>
  </Dialog >
}