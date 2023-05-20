"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var wallet_1 = __importDefault(require("../models/wallet"));
var transaction_1 = __importDefault(require("../models/transaction"));
var types_1 = require("../types");
var middlewares_1 = require("../middlewares");
var mongoose_1 = __importDefault(require("mongoose"));
var decimal_js_1 = __importDefault(require("decimal.js"));
var router = express_1.default.Router();
// Initialize
router.post("/setup", (0, middlewares_1.allRequiredKeysPresent)(["balance", "name"]), function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, balance, name, wallet, transactionId, err_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                _a = req.body, balance = _a.balance, name = _a.name;
                balance = Number(balance);
                if (isNaN(balance))
                    throw new Error("not a valid balance");
                wallet = new wallet_1.default({ balance: 0, name: name });
                return [4 /*yield*/, wallet.save()];
            case 1:
                _b.sent();
                return [4 /*yield*/, createTransaction({
                        amount: balance,
                        description: "Wallet setup",
                        walletId: wallet.walletId,
                    })];
            case 2:
                transactionId = (_b.sent()).transactionId;
                res
                    .status(200)
                    .json({ id: wallet.walletId, walletId: wallet.walletId, balance: balance, transactionId: transactionId, name: wallet.name, date: wallet.date });
                return [3 /*break*/, 4];
            case 3:
                err_1 = _b.sent();
                res.status(500).json({ error: err_1.message });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
// Credit/Debit
router.post("/transact/:walletId", (0, middlewares_1.allRequiredKeysPresent)(["amount", "description"]), function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, amount, description, walletId, _b, balance, transactionId, err_2;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 2, , 3]);
                _a = req.body, amount = _a.amount, description = _a.description;
                amount = Number(amount);
                if (isNaN(amount))
                    throw new Error("not a valid amount");
                walletId = req.params.walletId;
                return [4 /*yield*/, createTransaction({ amount: amount, description: description, walletId: walletId })];
            case 1:
                _b = _c.sent(), balance = _b.balance, transactionId = _b.transactionId;
                res.status(200).json({ balance: balance, transactionId: transactionId });
                return [3 /*break*/, 3];
            case 2:
                err_2 = _c.sent();
                res.status(500).json({ error: err_2.message });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// transactions
router.get("/transactions/:walletId", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, _b, page, _c, limit, _d, sort, _e, order, _f, format, walletId, transactions, fields_1, csvData, err_3;
    var _g;
    return __generator(this, function (_h) {
        switch (_h.label) {
            case 0:
                _h.trys.push([0, 2, , 3]);
                _a = req.query, _b = _a.page, page = _b === void 0 ? 1 : _b, _c = _a.limit, limit = _c === void 0 ? 10 : _c, _d = _a.sort, sort = _d === void 0 ? 'date' : _d, _e = _a.order, order = _e === void 0 ? 'desc' : _e, _f = _a.format, format = _f === void 0 ? 'json' : _f;
                walletId = req.params.walletId;
                return [4 /*yield*/, transaction_1.default.find({ walletId: walletId })
                        .sort((_g = {}, _g[sort] = order === 'desc' ? -1 : 1, _g))
                        .limit(limit * 1)
                        .skip((page - 1) * limit)
                        .exec()];
            case 1:
                transactions = _h.sent();
                if (format === 'csv') {
                    fields_1 = ['id', 'walletId', 'amount', 'balance', 'description', 'type'];
                    csvData = [fields_1.join(',')];
                    csvData.push.apply(csvData, transactions.map(function (transaction) { return fields_1.map(function (field) { return transaction[field]; }).join(','); }));
                    res.setHeader('Content-Type', 'text/csv');
                    res.attachment('transactions.csv');
                    return [2 /*return*/, res.send(csvData.join('\n'))];
                }
                res.json(transactions);
                return [3 /*break*/, 3];
            case 2:
                err_3 = _h.sent();
                res.status(500).json({ error: err_3.message });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// Get wallet details
router.get("/wallet/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var walletId, wallet, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                walletId = req.params.id;
                return [4 /*yield*/, wallet_1.default.findOne({ walletId: walletId })];
            case 1:
                wallet = _a.sent();
                if (!wallet)
                    return [2 /*return*/, res.status(404).json({ error: "Wallet not found" })];
                res.status(200).json(wallet);
                return [3 /*break*/, 3];
            case 2:
                err_4 = _a.sent();
                res.status(500).json({ error: err_4.message });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
var createTransaction = function (_a) {
    var amount = _a.amount, description = _a.description, walletId = _a.walletId;
    return __awaiter(void 0, void 0, void 0, function () {
        var session, wallet, type, newBalance, updatedWallet, transaction, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, mongoose_1.default.startSession()];
                case 1:
                    session = _b.sent();
                    session.startTransaction();
                    _b.label = 2;
                case 2:
                    _b.trys.push([2, 7, 9, 10]);
                    return [4 /*yield*/, wallet_1.default.findOne({ walletId: walletId }).session(session)];
                case 3:
                    wallet = _b.sent();
                    if (!wallet)
                        throw new Error("Wallet not found");
                    type = amount > 0 ? types_1.TransactionType.CREDIT : types_1.TransactionType.DEBIT;
                    newBalance = new decimal_js_1.default(wallet.balance).plus(amount);
                    if (newBalance.lt(0))
                        throw new Error("Insufficient funds");
                    return [4 /*yield*/, wallet_1.default.findOneAndUpdate({ walletId: walletId }, { $set: { balance: newBalance.toFixed(4) } }, { new: true, session: session })];
                case 4:
                    updatedWallet = _b.sent();
                    transaction = new transaction_1.default({
                        walletId: walletId,
                        amount: new decimal_js_1.default(amount).toFixed(4),
                        balance: updatedWallet.balance,
                        description: description,
                        type: type,
                    });
                    return [4 /*yield*/, transaction.save({ session: session })];
                case 5:
                    _b.sent();
                    return [4 /*yield*/, session.commitTransaction()];
                case 6:
                    _b.sent();
                    return [2 /*return*/, { balance: updatedWallet.balance, transactionId: transaction._id }];
                case 7:
                    error_1 = _b.sent();
                    return [4 /*yield*/, session.abortTransaction()];
                case 8:
                    _b.sent();
                    throw error_1;
                case 9:
                    session.endSession();
                    return [7 /*endfinally*/];
                case 10: return [2 /*return*/];
            }
        });
    });
};
exports.default = router;
//# sourceMappingURL=walletRoute.js.map