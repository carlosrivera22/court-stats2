import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useState, useEffect } from "react";
import { getPlayerStats } from "@/services/players";
import AddStatsModal from "./AddStatsModal";
import { Box, Button } from "@mui/material";
import { useAuth } from "@/providers/AuthProvider";

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

export default function StatsTable({
  player,
  onUpdate,
}: {
  player: any;
  onUpdate: () => void;
}) {
  const { user } = useAuth();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [playerStats, setPlayerStats] = useState<any>([]);
  const [open, setOpen] = useState(false);

  const fetchPlayerStats = async (playerId: number) => {
    const stats = await getPlayerStats(playerId);
    if (stats) {
      setPlayerStats(stats);
    }
  };
  useEffect(() => {
    fetchPlayerStats(player.id);
  }, []);

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
            {playerStats
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row: { [x: string]: any }) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.id} // It's better to use a unique id for the key if available
                  >
                    {columns.map((column) => {
                      const value = row[column.id];
                      const date =
                        column.id === "date" &&
                        new Date(value).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        });
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.id === "date" ? date : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <Box
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: "15px",
          marginBottom: "15px",
        }}
      >
        {user && (
          <Button
            size="small"
            variant="contained"
            color="primary"
            onClick={() => setOpen(true)}
            style={{
              fontWeight: "800",
              marginLeft: "15px",
            }}
          >
            Add Stats
          </Button>
        )}
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={playerStats.length ?? 0}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>

      <AddStatsModal
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        onSubmit={async () => {
          fetchPlayerStats(player.id);
          onUpdate();
        }}
        playerId={player.id}
      />
    </Paper>
  );
}
