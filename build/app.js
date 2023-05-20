"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var walletRoute_1 = __importDefault(require("./routes/walletRoute"));
var path_1 = __importDefault(require("path"));
var app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.static(path_1.default.join(__dirname, "..", "public", "build")));
app.use('/api', walletRoute_1.default);
app.get('*', function (req, res) {
    res.sendFile(path_1.default.join(__dirname, "..", "public", "build", "index.html"));
});
exports.default = app;
//# sourceMappingURL=app.js.map