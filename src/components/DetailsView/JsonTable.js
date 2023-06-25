import styled from "@emotion/styled"
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material"
import { JsonView } from "react-json-view-lite"

const JsonCell = ({ value }) => {
  if (Array.isArray(value)) {
    return <JsonView data={value} collapsed={()=>true} />
  } else if (typeof value === 'object') {
    return <JsonView data={value} collapsed={()=>true} />
  } else {
    return value
  }
}

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default ({ json }) => {
  return <TableContainer component={Paper} sx={{
    maxWidth: "100%",
    maxHeight: "100%",
    tableLayout: "fixed",
    whiteSpace: "nowrap"

  }}>
    <Table aria-label="simple table" size="small" sx={{ maxHeight: "100%" }}>
      <TableHead>
        <TableRow>
          <TableCell>Property</TableCell>
          <TableCell>Value</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {json ?
          Object.entries(json).map(([key, value]) => (
            <StyledTableRow
              key={key + "-" + JSON.stringify(value)}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell>{key}</TableCell>
              <TableCell>
                <JsonCell value={value} />
              </TableCell>
            </StyledTableRow>
          ))
          :
          <TableRow>
            <TableCell>No data to display</TableCell>
          </TableRow>}
      </TableBody>
    </Table>
  </TableContainer>
}