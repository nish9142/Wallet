import mongoose from "mongoose";
import { TransactionType } from '../types';

const transactionSchema = new mongoose.Schema({
    walletId: { type: String, required: true },
    amount: { type: Number, required: true },
    balance: { type: Number, required: true },
    description: { type: String},
    date: { type: Date, default: Date.now },
    type: { type: String, enum: [TransactionType.CREDIT,TransactionType.DEBIT], required: true }
});

export default mongoose.model('transaction', transactionSchema);
