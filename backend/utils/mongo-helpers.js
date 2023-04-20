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
exports.clearDatabase = void 0;
const mongoose_1 = require("mongoose");
const timer_utils_1 = require("./timer-utils");
const clearDatabase = (connection) => __awaiter(void 0, void 0, void 0, function* () {
    // Before attempting to stop any collections, make sure db connection is in the connected state
    yield (0, timer_utils_1.waitForSyncFunction)(() => connection.readyState === mongoose_1.ConnectionStates.connected, 5000);
    // Drop entire database (which will drop all collections in one operation)
    yield connection.dropDatabase();
});
exports.clearDatabase = clearDatabase;
