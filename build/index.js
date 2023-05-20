"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = __importDefault(require("./app"));
var mongoose_1 = __importDefault(require("mongoose"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var MONGO_URI = process.env.MONGO_URI;
mongoose_1.default
    .connect(MONGO_URI, { dbName: "HL" })
    .then(function () { return console.log("Connected to database"); })
    .then(function () {
    var port = process.env.PORT || 8080;
    app_1.default.listen(port, function () {
        console.log(__dirname);
        console.log("Listening on port", port);
    });
})
    .catch(function (err) { return console.error(err); });
//# sourceMappingURL=index.js.map