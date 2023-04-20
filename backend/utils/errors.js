"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WaitForTimeoutError = exports.ProjectError = void 0;
class ProjectError extends Error {
    constructor(...args) {
        super(...args);
        this.name = this.constructor.name;
    }
}
exports.ProjectError = ProjectError;
class WaitForTimeoutError extends ProjectError {
}
exports.WaitForTimeoutError = WaitForTimeoutError;
