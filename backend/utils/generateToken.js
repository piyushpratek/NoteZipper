"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const generateToken = (id) => {
    return jsonwebtoken_1.default.sign({ id }, config_1.JWT_SECRET, {
        expiresIn: '30d',
    });
};
exports.generateToken = generateToken;
