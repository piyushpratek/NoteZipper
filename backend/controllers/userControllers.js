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
exports.updateUserProfile = exports.authUser = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const userModel_1 = __importDefault(require("../models/userModel"));
const generateToken_1 = require("../utils/generateToken");
const registerUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, pic } = req.body;
    const userExists = yield userModel_1.default.findOne({ email });
    if (userExists != null) {
        res.status(400);
        throw new Error('User Already Exists');
    }
    try {
        const user = yield userModel_1.default.create({
            name,
            email,
            password,
            pic,
        });
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.IsAdmin,
            pic: user.pic,
            token: (0, generateToken_1.generateToken)(user._id.toString()),
        });
    }
    catch (error) {
        res.status(400);
        throw new Error('Error Ocurred! ');
    }
}));
exports.authUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield userModel_1.default.findOne({ email });
    if (user != null && (yield user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.IsAdmin,
            pic: user.pic,
            token: (0, generateToken_1.generateToken)(user._id.toString()),
        });
    }
    else {
        res.status(400);
        throw new Error('Invalid Email or Password! ');
    }
}));
exports.updateUserProfile = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log('request user?', req?.user?._id)
    var _a;
    //  way one
    // const user = await User.findById(req?.user?._id)
    //  way two
    const user = yield userModel_1.default.findOne({ _id: (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a._id });
    // console.log('user?', user)
    if (user != null) {
        // We update the properties of `user` only if they are defined.
        if (typeof req.body.name !== 'undefined') {
            user.name = req.body.name;
        }
        if (typeof req.body.email !== 'undefined') {
            user.email = req.body.email;
        }
        if (typeof req.body.pic !== 'undefined') {
            user.pic = req.body.pic;
        }
        if (typeof req.body.password !== 'undefined') {
            user.password = req.body.password;
        }
        // Finally we save the updated user to database
        const updatedUser = yield user.save();
        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            pic: updatedUser.pic,
            token: (0, generateToken_1.generateToken)(updatedUser._id.toString()),
        });
    }
    else {
        res.status(404);
        throw new Error('User not Found');
    }
}));
exports.default = registerUser;
