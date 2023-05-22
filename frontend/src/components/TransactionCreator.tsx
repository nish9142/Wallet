import React, { useState } from "react";
import { Transaction } from "../types";
import {
  TextField,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  makeStyles,
} from "@material-ui/core";
import { useParams } from "react-router-dom";
import useApi from '../hooks/useApi';

export enum TransactionType {
  CREDIT = "CREDIT",
  DEBIT = "DEBIT",
}

interface Props {
  fetchWallet: () => any;
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(2),
  },
  formControl: {
    marginTop: theme.spacing(2),
  },
  button: {
    marginTop: theme.spacing(2),
  },
  message: {
    marginTop: theme.spacing(2),
  },
}));

export const TransactionCreator: React.FC<Props> = ({ fetchWallet }) => {
  const classes = useStyles();
  const { id: walletId } = useParams<{ id: string }>();
  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState("");
  const [transaction, setTransaction] = useState<Transaction | null>(null);
  const [transactionType, setTransactionType] = useState("CREDIT");
  const { createTransaction } = useApi();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (walletId && amount && transactionType) {
      try {
        const newTransaction = await createTransaction(
          walletId,
          TransactionType.DEBIT === transactionType ? amount * -1 : amount,
          description
        );
        setTransaction(newTransaction);
        fetchWallet();
        // Reset form fields
        setAmount(0);
        setDescription("");
        setTransactionType("CREDIT");
      } catch (error) {
        console.error(error)
      }
      
    }
  };

  return (
    <Paper className={classes.paper}>
      <form onSubmit={handleSubmit}>
        <FormControl fullWidth className={classes.formControl}>
          <InputLabel id="transaction-type-label">Transaction Type</InputLabel>
          <Select
            labelId="transaction-type-label"
            id="transaction-type"
            value={transactionType}
            onChange={(e) => setTransactionType(e.target.value as any)}
          >
            <MenuItem value={TransactionType.CREDIT}>Credit</MenuItem>
            <MenuItem value={TransactionType.DEBIT}>Debit</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
          inputProps={{ min: "0" }}
          required
          fullWidth
          margin="normal"
        />
        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          className={classes.formControl}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth className={classes.button}>
          Create Transaction
        </Button>
        {transaction && (
          <Typography variant="subtitle1" className={classes.message}>
            Your last transaction done with ID: {transaction.transactionId}
          </Typography>
        )}
      </form>
    </Paper>
  );
};
