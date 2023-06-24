import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material"

const JsonCell = ({ value }) => {
  console.log(value, typeof value)
    if (Array.isArray(value)) {
      return <ul>
      {value.map(el => <li><pre>{JSON.stringify(el)}</pre></li>)}
    </ul>
    } else if (typeof value === 'object' ) {
      return <pre>{JSON.stringify(value)}</pre>
    } else {
      return value
    }
}

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
            <TableRow
              key={key}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell>{key}</TableCell>
  <TableCell>
              <JsonCell value={value} />
  </TableCell>
            </TableRow>
          ))
          :
          <TableRow>
            <TableCell>No data to display</TableCell>
          </TableRow>}
      </TableBody>
    </Table>
  </TableContainer>
}