import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material"
import Link from "next/link"

export default ({open, onClose}) => {

  return <Dialog open={open}>
    <DialogTitle sx={{ m: 0, p: 2 }}>
      Pick up zone
    </DialogTitle>
    <DialogContent dividers>
      <Typography gutterBottom>
        Pickup ULDs
      </Typography>
      <Typography gutterBottom>
        ID: <Typography
          component="span"
          sx={{ fontWeight: "bold" }}> 12345</Typography>
      </Typography>
    </DialogContent>
    <DialogActions sx={{display: "flex", justifyContent: "center"}}>
      <Button
        variant="contained"
        autoFocus
        component={Link}
        href="/mobilemap/1"
        onClick={onClose}
      >
        SCAN
      </Button>
    </DialogActions>
  </Dialog >
}