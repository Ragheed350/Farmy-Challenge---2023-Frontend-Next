// Main code here.
"use client";
import { useEffect } from "react";
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
import { FetchSalads, GetSaladAsync } from "../../src/redux/salad";
import { Button, Typography } from "@mui/material";
import { SaladDialog } from "./components/SaladDialog";
import { LoadingBox } from "@/src/components/LoadingBox";
import { FetchIngredients } from "@/src/redux/ingredient";

const SaladMaker = () => {
  const dispatch = useAppDispatch();

  const { salads, salad, status } = useAppSelector((state) => state.Salad);

  const handleOpenSaladDialog = (id: number) => {
    dispatch(GetSaladAsync({ id }));
  };

  useEffect(() => {
    dispatch(FetchSalads());
    dispatch(FetchIngredients());
  }, []);

  return (
    <Container maxWidth="xl">
      <Typography variant="h3" my={2}>
        Salad designer and planner
      </Typography>
      {salad ? <SaladDialog /> : null}
      <LoadingBox status={status}>
        <TableContainer component={Paper} sx={{ border: "1px solid gray" }}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                {salads[0] &&
                  Object.keys(salads[0]).map((key, _) => (
                    <StyledTableCell key={key}>
                      {String(key).toLocaleUpperCase()}
                    </StyledTableCell>
                  ))}
                <StyledTableCell>
                  {"actions".toLocaleUpperCase()}
                </StyledTableCell>
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
      </LoadingBox>
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
