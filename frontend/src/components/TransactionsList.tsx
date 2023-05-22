import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TableSortLabel,
  Button,
  Typography,
  Box,
} from "@material-ui/core";
import { Transaction } from "../types";
import { getDate } from "../helpers";
import useApi from '../hooks/useApi';

export const TransactionsTable: React.FC = () => {
  const { id } = useParams<{ id: string }>() as any;
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] = useState<"date" | "amount">("date");
  const { getTransactions } = useApi();

  const handleRequestSort = (property: "date" | "amount") => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    const fetchTransactions = async () => {
      if (!id) return;
      const data = await getTransactions(id, page + 1, rowsPerPage, orderBy, order);
      setTransactions(data);
    };
    fetchTransactions();
  }, [page, rowsPerPage, order, orderBy,id]);

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Transactions of Wallet: {id}
      </Typography>
      <Box marginY={2}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === "date"}
                    direction={order}
                    onClick={() => handleRequestSort("date")}
                  >
                    Date
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === "amount"}
                    direction={order}
                    onClick={() => handleRequestSort("amount")}
                  >
                    Amount
                  </TableSortLabel>
                </TableCell>
                <TableCell>Balance</TableCell>
                <TableCell>Type</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction._id}>
                  <TableCell>{transaction._id}</TableCell>
                  <TableCell>{getDate(transaction.date)}</TableCell>
                  <TableCell>{transaction.amount}</TableCell>
                  <TableCell>{transaction.balance}</TableCell>
                  <TableCell>{transaction.type}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={transactions.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={() => getTransactions(id, page + 1, rowsPerPage, orderBy, order, "csv")}
        >
          Export CSV
        </Button>
      </Box>
    </div>
  );
};
