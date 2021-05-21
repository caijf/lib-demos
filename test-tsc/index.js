"use strict";
// const a = [...[1, 2, 3]]
exports.__esModule = true;
var tslib_1 = require("tslib");
// console.log(a, 2);
// export {
//   a
// }
// 仅为了触发引入 tslib
// const arr = [..."test"];
// export { arr }
var count = 1;
var timer = setInterval(function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var module;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!(count >= 3)) return [3 /*break*/, 2];
                return [4 /*yield*/, Promise.resolve().then(function () { return tslib_1.__importStar(require("./test")); })];
            case 1:
                module = _a.sent();
                console.log(module);
                clearInterval(timer);
                return [3 /*break*/, 3];
            case 2:
                count++;
                _a.label = 3;
            case 3: return [2 /*return*/];
        }
    });
}); }, 1000);
