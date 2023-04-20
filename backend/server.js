"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const mongoDB_1 = __importDefault(require("./config/mongoDB"));
const logger_1 = __importDefault(require("./config/logger"));
// import exportError from './middlewares/errorMiddleware';
// import { notFound } from './middlewares/errorMiddleware';
// import errorHandler from './middlewares/errorMiddleware';
void mongoDB_1.default.connect();
const PORT = (_a = Number(process.env.PORT)) !== null && _a !== void 0 ? _a : 5000; //  nullish operator ?? is better than or operator ||
app_1.default.listen(PORT, () => {
    logger_1.default.success(`server started on port ${PORT} `);
});
