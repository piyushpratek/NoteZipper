"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NODE_ENV = exports.JWT_SECRET = exports.MONGO_URI = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const logger_1 = __importDefault(require("./logger"));
// NOTE: Always check if `NODE_ENV` before anything else
if (typeof process.env.NODE_ENV === 'undefined') {
    throw new Error('Please define Your `NODE_ENV` variable using `cross-env` in package.json file');
}
let envPath = '';
if (process.env.NODE_ENV === 'production') {
    envPath = '.env';
}
if (process.env.NODE_ENV === 'development') {
    envPath = '.env.development';
}
if (process.env.NODE_ENV === 'test') {
    envPath = '.env.test';
}
if (envPath === '') {
    logger_1.default.error('Please use a valid value of NODE_ENV variable.');
    throw new Error();
}
dotenv_1.default.config({ path: envPath });
if (typeof process.env.MONGO_URI === 'undefined') {
    throw new Error('Please define MONGO_URI in your .env file.');
}
if (typeof process.env.JWT_SECRET === 'undefined') {
    throw new Error(' Please define JWT_SECRET in your .env file.');
}
exports.MONGO_URI = process.env.MONGO_URI;
exports.JWT_SECRET = process.env.JWT_SECRET;
exports.NODE_ENV = process.env.NODE_ENV;
