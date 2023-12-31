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
import { deletePlayerStats, getPlayerStats } from "@/services/players";
import AddStatsModal from "./AddStatsModal";
import { Box, Button } from "@mui/material";
import { useAuth } from "@/providers/AuthProvider";
import AddIcon from "@mui/icons-material/Add";
import DeleteIconOutline from "@mui/icons-material/DeleteOutline";
import ConfirmModal from "./ConfirmModal";
import assert from "assert";

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
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [deletingId, setDeletingId] = useState<number>();
  const [deletingDate, setDeletingDate] = useState("");

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

  const handleDelete = (id: number) => {
    setDeletingId(id);
    const selectedRow = playerStats.find(
      (row: { id: number }) => row.id === id,
    );
    if (selectedRow) {
      setDeletingDate(
        new Date(selectedRow.date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
      );
    }
    setOpenConfirmDialog(true);
  };

  return (
    <Paper
      sx={{
        width: { xs: "100%", md: "70%", lg: "70%" },
        overflow: "hidden",
        boxShadow: "none",
        border: 1, // defines the border width
        borderColor: "#c2c2c2", // use the theme's primary color
      }}
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
              {user && <TableCell sx={{ backgroundColor: "#f0f0f0" }} />}
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
                    {columns.map((column, index) => {
                      const value = row[column.id];
                      const date =
                        column.id === "date" &&
                        new Date(value).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        });
                      return (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          style={{
                            paddingRight:
                              index === columns.length - 1 ? "50px" : undefined,
                          }}
                        >
                          {column.id === "date" ? date : value}
                        </TableCell>
                      );
                    })}
                    {user && (
                      <TableCell align="right">
                        <DeleteIconOutline
                          fontSize="small"
                          onClick={() => handleDelete(row.id)}
                          style={{ cursor: "pointer" }}
                          color="secondary"
                        />
                      </TableCell>
                    )}
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
            startIcon={<AddIcon />}
            size="small"
            variant="outlined"
            color="secondary"
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
          rowsPerPageOptions={[5, 10, 25, 100]}
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

      <ConfirmModal
        title="Delete Stats"
        body={`Are you sure you want to delete these stats from ${deletingDate}?`}
        open={openConfirmDialog}
        onClose={() => setOpenConfirmDialog(false)}
        onConfirm={async () => {
          assert(deletingId, "deletingId should be defined");
          await deletePlayerStats(deletingId);
          fetchPlayerStats(player.id);
          setOpenConfirmDialog(false);
        }}
      />
    </Paper>
  );
}
