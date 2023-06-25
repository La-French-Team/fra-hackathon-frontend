import call from "@/backend/backend"
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material"
import { useContext, useState } from "react";
import { useSession } from "next-auth/react";
import { MapContext } from "../MapContext";
import { useRouter } from "next/router";
import { LoadingButton } from "@mui/lab";

export default ({ open, onClose }) => {
  const session = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false)
  const { apiUrl } = useContext(MapContext);

  const onDropOff = () => {
    setLoading(true)
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
      <LoadingButton
        variant="contained"
        autoFocus
        loading={loading}
        disabled={loading}
        onClick={onDropOff}
      >
        CONFIRM
      </LoadingButton>
    </DialogActions>
  </Dialog >
}