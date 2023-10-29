import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

interface Column {
  id: "date" | "points" | "assists" | "rebounds";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: "date", label: "Date", minWidth: 100 },
  { id: "points", label: "Points", minWidth: 50, align: "right" },
  { id: "assists", label: "Assists", minWidth: 50, align: "right" },
  { id: "rebounds", label: "Rebounds", minWidth: 50, align: "right" },
];

interface Data {
  date: string;
  points: number;
  assists: number;
  rebounds: number;
}

function createData(
  date: string,
  points: number,
  assists: number,
  rebounds: number,
): Data {
  return { date, points, assists, rebounds };
}

const rows = [
  createData("2023-10-01", 25, 5, 7),
  createData("2023-10-02", 28, 6, 9),
  createData("2023-10-03", 30, 8, 10),
  // ... add more data here
];

// ... (rest of the imports)

export default function StatsTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper
      sx={{ width: { xs: "100%", md: "70%", lg: "70%" }, overflow: "hidden" }}
    >
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column, index) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{
                    minWidth: column.minWidth,
                    paddingRight:
                      index === columns.length - 1 ? "50px" : undefined, // Add padding to the last column
                  }}
                  sx={{ backgroundColor: "#f0f0f0" }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.date}>
                    {columns.map((column, index) => {
                      const value = row[column.id];
                      return (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          style={{
                            paddingRight:
                              index === columns.length - 1 ? "50px" : undefined, // Add padding to the last column
                          }}
                        >
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
