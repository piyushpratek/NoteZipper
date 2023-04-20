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
const app_1 = __importDefault(require("../../../app"));
const supertest_1 = __importDefault(require("supertest"));
const mongoDB_1 = __importDefault(require("../../../config/mongoDB"));
const mongoose_1 = __importDefault(require("mongoose"));
const mongo_helpers_1 = require("../../../utils/mongo-helpers");
describe('Server health checkup', () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield mongoDB_1.default.connect();
        yield (0, mongo_helpers_1.clearDatabase)(mongoose_1.default.connection);
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield mongoDB_1.default.disconnect();
    }));
    test('api should return expected message', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).get('/');
        expect(response.statusCode).toBe(200);
        expect(response.body).toBe('API IS RUNNING..');
    }));
});
