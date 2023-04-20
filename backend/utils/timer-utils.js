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
Object.defineProperty(exports, "__esModule", { value: true });
exports.waitForSyncFunction = exports.waitForAsyncFunction = exports.sleep = void 0;
const errors_1 = require("./errors");
function sleep(ms) {
    return __awaiter(this, void 0, void 0, function* () {
        yield new Promise((resolve) => {
            setTimeout(resolve, ms);
        });
    });
}
exports.sleep = sleep;
function waitForAsyncFunction(func, timeoutInMillis, throwErrorIfConditionNeverMet = false) {
    return __awaiter(this, void 0, void 0, function* () {
        const startTime = Date.now();
        while (Date.now() - startTime < timeoutInMillis) {
            if (yield func()) {
                return;
            }
            yield sleep(100);
        }
        if (throwErrorIfConditionNeverMet) {
            throw new errors_1.WaitForTimeoutError(`Exceeded waitFor timeout of ${timeoutInMillis} milliseconds`);
        }
    });
}
exports.waitForAsyncFunction = waitForAsyncFunction;
function waitForSyncFunction(func, timeoutInMillis, throwErrorIfConditionNeverMet = false) {
    return __awaiter(this, void 0, void 0, function* () {
        const syncFunctionAsAsyncFunction = () => __awaiter(this, void 0, void 0, function* () { return yield Promise.resolve(func()); });
        yield waitForAsyncFunction(syncFunctionAsAsyncFunction, timeoutInMillis, throwErrorIfConditionNeverMet);
    });
}
exports.waitForSyncFunction = waitForSyncFunction;
