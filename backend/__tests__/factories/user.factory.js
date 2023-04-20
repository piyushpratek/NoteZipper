"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userFactory = void 0;
const fishery_1 = require("fishery");
const userModel_1 = require("../../models/userModel");
exports.userFactory = fishery_1.Factory.define(({ sequence, transientParams, afterBuild }) => {
    afterBuild((user) => {
        var _a, _b;
        user.password = (0, userModel_1.hashPassword)((_a = transientParams.plainPassword) !== null && _a !== void 0 ? _a : 'secret-password');
        user.IsAdmin = (_b = transientParams.IsAdmin) !== null && _b !== void 0 ? _b : false;
    });
    const Sequence = String(sequence);
    return {
        name: `Name ${Sequence}`,
        email: `user${Sequence}@sample.com`,
        pic: 'https://sample.com/factory.png',
    };
});
