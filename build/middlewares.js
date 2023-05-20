"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.allRequiredKeysPresent = void 0;
var allRequiredKeysPresent = function (requiredKeys) { return function (req, res, next) {
    var payload = req.body || {};
    var payloadKeys = Object.keys(payload);
    for (var _i = 0, requiredKeys_1 = requiredKeys; _i < requiredKeys_1.length; _i++) {
        var key = requiredKeys_1[_i];
        if (!payloadKeys.includes(key)) {
            res.status(403).send({ error: "Required key(s) missing" });
            throw new Error("Required key(s) missing");
        }
    }
    next();
}; };
exports.allRequiredKeysPresent = allRequiredKeysPresent;
//# sourceMappingURL=middlewares.js.map