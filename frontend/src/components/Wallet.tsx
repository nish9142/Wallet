import React, { useCallback, useEffect, useState } from "react";
import { Wallet } from "../types";
import { TransactionCreator } from "./TransactionCreator";
import { useLocation, useParams } from "react-router-dom";
import { getWallet } from "../api";
import { Button, Container, Paper, Typography, makeStyles } from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  paper: {
    margin: 30,
    width: 500,
    padding: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  transaction: {
    marginTop: theme.spacing(2),
  },
  linkButton: {
    marginTop: theme.spacing(3),
  },
}));

export const WalletComponent: React.FC = () => {
  const classes = useStyles();
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const location = useLocation();
  const { id: walletId } = useParams<{ id: string }>();

  const fetchWallet = useCallback(async () => {
    if (walletId) {
      const wal = await getWallet(walletId);
      setWallet(wal);
    }
  }, [walletId]);

  useEffect(() => {
    if (location.state) {
      setWallet(location.state.wallet);
    } else {
      fetchWallet();
    }
  }, [fetchWallet, location.state]);

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper}>
        {!wallet ? (
          <Typography variant="h5">Loading.....</Typography>
        ) : (
          <>
            <Typography variant="h6">Created wallet with ID: {wallet.walletId}</Typography>
            <Typography variant="body1">Name: {wallet.name}</Typography>
            <Typography variant="body1">Balance: {wallet.balance}</Typography>
            <TransactionCreator fetchWallet={fetchWallet} />
            <Button
              className={classes.linkButton}
              variant="contained"
              color="primary"
              component={RouterLink}
              to={`/transactions/${walletId}`}
            >
              All Transactions
            </Button>
          </>
        )}
      </Paper>
    </Container>
  );
};
