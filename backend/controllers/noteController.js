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
exports.DeleteNote = exports.UpdateNote = exports.getNoteById = exports.createNote = exports.getNotes = void 0;
const noteModel_1 = __importDefault(require("../models/noteModel"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
exports.getNotes = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const notes = yield noteModel_1.default.find({ user: (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a._id });
    res.json(notes);
}));
exports.createNote = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const { title, content, category } = req.body;
    if (title === '' || content === '' || category === '') {
        res.status(400);
        throw new Error('Please Fill all the Fields');
    }
    else {
        // user is coming from authMiddleware
        const note = new noteModel_1.default({ user: (_b = req === null || req === void 0 ? void 0 : req.user) === null || _b === void 0 ? void 0 : _b._id, title, content, category });
        const createdNote = yield note.save();
        res.status(201).json(createdNote);
    }
}));
// we are fetching .id from the url that we put in noteRoutes
exports.getNoteById = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const note = yield noteModel_1.default.findById(req.params.id);
    if (note != null) {
        res.json(note);
    }
    else {
        res.status(404).json({ message: 'Note not Found' });
    }
}));
exports.UpdateNote = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c, _d;
    const { title, content, category } = req.body;
    const note = yield noteModel_1.default.findById(req === null || req === void 0 ? void 0 : req.params.id);
    if ((note === null || note === void 0 ? void 0 : note.user.toString()) !== ((_d = (_c = req === null || req === void 0 ? void 0 : req.user) === null || _c === void 0 ? void 0 : _c._id) === null || _d === void 0 ? void 0 : _d.toString())) {
        res.status(401);
        throw new Error("You can't perform this action");
    }
    if (note != null) {
        note.title = title;
        note.content = content;
        note.category = category;
        const updatedNote = yield note.save();
        res.json(updatedNote);
    }
    else {
        res.status(404);
        throw new Error('Note not Found');
    }
}));
exports.DeleteNote = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _e, _f;
    const note = yield noteModel_1.default.findById(req.params.id);
    if ((note === null || note === void 0 ? void 0 : note.user.toString()) !== ((_f = (_e = req === null || req === void 0 ? void 0 : req.user) === null || _e === void 0 ? void 0 : _e._id) === null || _f === void 0 ? void 0 : _f.toString())) {
        res.status(401);
        throw new Error("You can't perform this action");
    }
    if (note != null) {
        yield note.remove();
        res.json({ message: 'Note Removed' });
    }
    else {
        res.status(404);
        throw new Error('Note not Found');
    }
}));
