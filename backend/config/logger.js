"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
exports.default = {
    success: (...args) => {
        console.log(chalk_1.default.bold.greenBright(...args));
    },
    error: (...args) => {
        console.log(chalk_1.default.bold.redBright(...args));
    },
    info: (...args) => {
        console.log(chalk_1.default.bold.yellowBright(...args));
    },
};
