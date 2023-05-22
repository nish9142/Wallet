import React, { useEffect, useState } from "react";
import { Wallet } from "../types";
import { useNavigate } from "react-router-dom";
import { Button, Container, TextField, Typography,makeStyles, Paper } from "@material-ui/core";
import useApi from '../hooks/useApi';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  paper: {
    margin: 30,
    padding: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

export const WalletCreator: React.FC = () => {
  const classes = useStyles();
  const [name, setName] = useState("");
  const [balance, setBalance] = useState<number>(0);
  const {createWallet} = useApi()

  const navigate = useNavigate();
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const newWallet = await createWallet(name, balance);
    setupWallet(newWallet);
  };

  const setupWallet = (wal: Wallet) => {
    localStorage.setItem("wallet", JSON.stringify(wal));
    navigate(`/wallet/${wal.walletId}`, { state: { wallet: wal } });
  };

  useEffect(() => {
    const wal = localStorage.getItem("wallet");
    const walletId = wal && JSON.parse(wal)?.walletId;
    walletId && navigate(`/wallet/${walletId}`);
  }, [navigate]);

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper}>
        <Typography component="h1" variant="h5">
          Create Wallet
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Wallet name"
            name="name"
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="balance"
            label="Initial balance"
            type="number"
            id="balance"
            value={balance}
            onChange={(e) => setBalance(Number(e.target.value))}
          />
          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
            Create Wallet
          </Button>
        </form>
      </Paper>
    </Container>
  );
};
