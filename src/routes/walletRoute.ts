import express from "express";
import Wallet from "../models/wallet";
import Transaction from "../models/transaction";
import { TransactionType } from "../types";
import { allRequiredKeysPresent } from "../middlewares";
import mongoose from "mongoose";
import Decimal from 'decimal.js';

interface CreateTransactionInput {
  amount: number;
  description: string;
  walletId: string;
}

const router = express.Router();

// Initialize
router.post("/setup", allRequiredKeysPresent(["balance", "name"]), async (req, res) => {
  try {
    let { balance, name } = req.body;
    balance = Number(balance)
    if (isNaN(balance)) throw new Error("not a valid balance")
    const wallet = new Wallet({ balance: 0, name });
    await wallet.save();
    const { transactionId } = await createTransaction({
      amount: balance,
      description: "Wallet setup",
      walletId: wallet.walletId,
    });
    res
      .status(200)
      .json({ id: wallet.walletId, walletId:wallet.walletId, balance, transactionId: transactionId, name: wallet.name, date: wallet.date });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Credit/Debit
router.post("/transact/:walletId", allRequiredKeysPresent(["amount", "description"]), async (req, res) => {
  try {
    let { amount, description } = req.body;
    amount = Number(amount)
    if(isNaN(amount)) throw new Error("not a valid amount")
    const walletId = req.params.walletId;
    const { balance, transactionId } = await createTransaction({ amount, description, walletId });
    res.status(200).json({ balance, transactionId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// transactions
router.get("/transactions/:walletId", async (req, res) => {
  try {
    const { page = 1, limit = 10, sort = 'date', order = 'desc', format = 'json' } = req.query as any;
    const { walletId } = req.params;

    const transactions = await Transaction.find({ walletId })
      .sort({ [sort]: order === 'desc' ? -1 : 1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    if (format === 'csv') {
      const fields = ['id', 'walletId', 'amount', 'balance', 'description', 'type'];
      let csvData = [fields.join(',')];
      csvData.push(...transactions.map(transaction => fields.map(field => transaction[field]).join(',')));
      res.setHeader('Content-Type', 'text/csv');
      res.attachment('transactions.csv');
      return res.send(csvData.join('\n'));
    }
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get wallet details
router.get("/wallet/:id", async (req, res) => {
  try {
    const walletId = req.params.id;
    const wallet = await Wallet.findOne({ walletId });
    if (!wallet) return res.status(404).json({ error: "Wallet not found" });
    res.status(200).json(wallet);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const createTransaction = async ({ amount, description, walletId }: CreateTransactionInput) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const wallet = await Wallet.findOne({ walletId }).session(session);
    if (!wallet) throw new Error("Wallet not found");

    const type = amount > 0 ? TransactionType.CREDIT : TransactionType.DEBIT;
    const newBalance = new Decimal(wallet.balance).plus(amount);
    if (newBalance.lt(0)) throw new Error("Insufficient funds");

    // update wallet balance atomically
    const updatedWallet = await Wallet.findOneAndUpdate(
      { walletId },
      { $set: { balance: newBalance.toFixed(4) } }, 
      { new: true, session }
    );

    const transaction = new Transaction({
      walletId,
      amount: new Decimal(amount).toFixed(4), 
      balance: updatedWallet.balance,
      description,
      type,
    });

    await transaction.save({ session });
    await session.commitTransaction();
    return { balance: updatedWallet.balance, transactionId: transaction._id };
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};


export default router;
