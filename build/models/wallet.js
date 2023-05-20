"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var shortid_1 = __importDefault(require("shortid"));
var walletSchema = new mongoose_1.default.Schema({
    walletId: { type: String, default: shortid_1.default.generate, unique: true },
    balance: { type: Number, required: true, default: 0 },
    name: { type: String, required: true },
    date: { type: Date, default: Date.now }
});
exports.default = mongoose_1.default.model('wallet', walletSchema);
//# sourceMappingURL=wallet.js.map