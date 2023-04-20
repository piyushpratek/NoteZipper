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
const mongoose_1 = __importDefault(require("mongoose"));
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../../../app"));
const mongoDB_1 = __importDefault(require("../../../config/mongoDB"));
const constants_1 = require("../../../constants");
const mongo_helpers_1 = require("../../../utils/mongo-helpers");
const user_factory_1 = require("../../factories/user.factory");
describe('users', () => {
    let sampleUser;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield mongoDB_1.default.connect();
        yield (0, mongo_helpers_1.clearDatabase)(mongoose_1.default.connection);
        sampleUser = user_factory_1.userFactory.build();
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield mongoDB_1.default.disconnect();
    }));
    test('successful registration', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).post('/api/users').send(sampleUser);
        expect(response.statusCode).toBe(201);
        expect(response.body).toEqual({
            // _id: expect.any(String),
            _id: expect.stringMatching(constants_1.SIMPLE_MONGODB_ID_REGEX),
            email: sampleUser.email,
            isAdmin: sampleUser.IsAdmin,
            name: sampleUser.name,
            pic: sampleUser.pic,
            token: expect.any(String),
        });
    }));
});
