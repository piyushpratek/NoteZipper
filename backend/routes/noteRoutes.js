"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const noteController_1 = require("../controllers/noteController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = express_1.default.Router();
router.route('/').get(authMiddleware_1.protect, noteController_1.getNotes);
router.route('/create').post(authMiddleware_1.protect, noteController_1.createNote);
router
    .route('/:id')
    .get(noteController_1.getNoteById)
    .put(authMiddleware_1.protect, noteController_1.UpdateNote)
    .delete(authMiddleware_1.protect, noteController_1.DeleteNote);
exports.default = router;
