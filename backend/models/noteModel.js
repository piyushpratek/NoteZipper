"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const noteSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
}, {
    timestamps: true,
});
const Note = mongoose_1.default.model('Note', noteSchema);
exports.default = Note;
