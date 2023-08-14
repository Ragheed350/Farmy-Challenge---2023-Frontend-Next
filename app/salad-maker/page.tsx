// Main code here.
"use client";
import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Container from "@mui/material/Container";
import { useAppDispatch, useAppSelector } from "../../src/redux/hooks";
import { FetchSalads, GetSalad } from "../../src/redux/salad";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useSearchParams, useRouter } from "next/navigation";

const SaladMaker = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const hasId = searchParams.has("id");

  const { salads, status } = useAppSelector((state) => state.Salad);

  const handleOpenSaladDialog = (id: number) => {
    router.replace("?id=" + id);
  };

  useEffect(() => {
    dispatch(FetchSalads());
  }, []);

  return (
    <Container maxWidth="xl">
      {hasId ? <SaladDialog /> : null}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              {salads[0] &&
                Object.keys(salads[0]).map((key, _) => (
                  <StyledTableCell key={key}>
                    {String(key).toLocaleUpperCase()}
                  </StyledTableCell>
                ))}
              <StyledTableCell>{"actions".toLocaleUpperCase()}</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {salads.map((row) => (
              <StyledTableRow key={row.name}>
                <StyledTableCell>{row.id}</StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  {row.name}
                </StyledTableCell>
                <StyledTableCell>{row.size}</StyledTableCell>
                <StyledTableCell>{row.ingredients.length}</StyledTableCell>
                <StyledTableCell>{row.cost}</StyledTableCell>
                <StyledTableCell>{row.targetStock}</StyledTableCell>
                <StyledTableCell>{row.currentStock}</StyledTableCell>
                <StyledTableCell>{row.price}</StyledTableCell>
                <StyledTableCell>
                  <Button onClick={() => handleOpenSaladDialog(row.id)}>
                    Edit
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default SaladMaker;

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const SaladDialog = () => {
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const router = useRouter();

  const id = searchParams.get("id");

  const { salad, status } = useAppSelector((state) => state.Salad);

  const handleCloseSaladDialog = () => {
    router.replace("/salad-maker");
  };

  useEffect(() => {
    dispatch(GetSalad({ id: Number(id) }));
  }, []);

  useEffect(() => {
    // dispatch(FetchGradiants());
  }, []);

  return (
    <Dialog
      open={!!id}
      onClose={handleCloseSaladDialog}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle>{salad?.name}</DialogTitle>
      <DialogContent>
        {status === "error" ? (
          <DialogContentText>err</DialogContentText>
        ) : (
          <DialogContentText>
            Let Google help apps determine location. This means sending
            anonymous location data to Google, even when no apps are running.
          </DialogContentText>
        )}
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleCloseSaladDialog}>
          Disagree
        </Button>
        <Button onClick={handleCloseSaladDialog} autoFocus>
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
};
