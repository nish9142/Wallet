import mongoose from "mongoose";
import shortid from "shortid";

const walletSchema = new mongoose.Schema({
    walletId: { type: String, default: shortid.generate, unique: true },
    balance: { type: Number, required: true,default:0 },
    name: { type: String, required: true},
    date: { type: Date, default: Date.now }
});

export default mongoose.model('wallet', walletSchema);
