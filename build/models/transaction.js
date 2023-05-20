"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var types_1 = require("../types");
var transactionSchema = new mongoose_1.default.Schema({
    walletId: { type: String, required: true },
    amount: { type: Number, required: true },
    balance: { type: Number, required: true },
    description: { type: String, required: true },
    date: { type: Date, default: Date.now },
    type: { type: String, enum: [types_1.TransactionType.CREDIT, types_1.TransactionType.DEBIT], required: true }
});
exports.default = mongoose_1.default.model('transaction', transactionSchema);
//# sourceMappingURL=transaction.js.map