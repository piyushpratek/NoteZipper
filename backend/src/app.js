"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRoutes_1 = __importDefault(require("../routes/userRoutes"));
const path_1 = __importDefault(require("path"));
const noteRoutes_1 = __importDefault(require("../routes/noteRoutes"));
const errorMiddleware_1 = require("../middlewares/errorMiddleware");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get('/', (req, res) => {
    res.json('API IS RUNNING..');
});
app.use('/api/users', userRoutes_1.default);
app.use('/api/notes', noteRoutes_1.default);
if (process.env.NODE_ENV === 'production' && process.env.VITE !== 'false') {
    const reactBuildPath = path_1.default.join('./react-static');
    const staticMiddleware = express_1.default.static(reactBuildPath);
    app.use(staticMiddleware);
    app.use('*', staticMiddleware);
    const assetsPath = path_1.default.join('./react-static/assets');
    app.use('/assets', express_1.default.static(assetsPath));
}
app.use(errorMiddleware_1.notFound);
app.use(errorMiddleware_1.errorHandler);
exports.default = app;
