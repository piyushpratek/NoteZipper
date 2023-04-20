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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("./config");
const logger_1 = __importDefault(require("./logger"));
exports.default = {
    mongoose: mongoose_1.default,
    connect: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            mongoose_1.default.set('strictQuery', true);
            const conn = yield mongoose_1.default.connect(config_1.MONGO_URI);
            if (process.env.NODE_ENV !== 'test') {
                logger_1.default.success(`Mongo Db Connected: ${conn.connection.host}`);
            }
        }
        catch (error) {
            logger_1.default.error(`Error: ${error.message}`);
            process.exit();
        }
    }),
    disconnect: () => __awaiter(void 0, void 0, void 0, function* () {
        yield mongoose_1.default.disconnect();
    }),
};
