import {
  Button,
  Drawer,
  IconButton,
  Link,
  Paper,
  Typography
} from "@mui/material"
import LinkIcon from '@mui/icons-material/Link';
import { useEffect, useState } from "react";
import JsonTable from "./JsonTable";
import { JsonView, defaultStyles } from "react-json-view-lite";


import 'react-json-view-lite/dist/index.css';
import ky from "ky";

export default ({ uri = null, style }) => {
  const [data, setData] = useState(null)
  const [drawerOpened, setDrawerOpened] = useState(false)

  useEffect(() => {
    const laodData = async () => {
      if (!!uri) {
        setData(await ky(uri).json())
      }
    }

    laodData()
  }, [uri])

  const openDrawer = () => {
    setDrawerOpened(true);
  }
  const closeDrawer = () => {
    setDrawerOpened(false);
  }
  console.log(data)

  return <>
    <Drawer
      anchor="left"
      open={drawerOpened}
      onClose={closeDrawer}
    >
      <JsonView
        data={data}
        shouldInitiallyExpand={() => true}
        style={defaultStyles} />
    </Drawer>
    <Paper style={{
      display: "flex",
      flexDirection: "column",
      padding: "0.5rem",
      ...style
    }}
      variant="outlined">
      <div style={{
        display: "flex",
        justifyContent: "space-between"
      }}>
        <Typography variant="h5">Details</Typography>
        <span>
          <IconButton
            component={Link}
            href={uri}
            disabled={!uri}
            sx={{ mr: "1rem" }} >
            <LinkIcon />
          </IconButton>
          <Button
            disabled={!data}
            onClick={openDrawer}
            variant="outlined">JSON</Button>
        </span>
      </div>
      <JsonTable json={data} />
    </Paper>
  </>
}
