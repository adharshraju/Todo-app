"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockTodoProxy = void 0;
const tslib_1 = require("tslib");
const n_defensive_1 = require("@nivinjoseph/n-defensive");
class MockTodoProxy {
    constructor(id, title, description) {
        (0, n_defensive_1.given)(id, "id").ensureHasValue().ensureIsString();
        this._id = id.trim();
        (0, n_defensive_1.given)(title, "title").ensureHasValue().ensureIsString();
        this._title = title;
        (0, n_defensive_1.given)(description, "description").ensureIsString();
        this._description = description || null;
        this._isCompleted = false;
        this._isDeleted = false;
    }
    get id() { return this._id; }
    get title() { return this._title; }
    get description() { return this._description; }
    get isCompleted() { return this._isCompleted; }
    get isDeleted() { return this._isDeleted; }
    update(title, description) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            (0, n_defensive_1.given)(title, "title").ensureHasValue().ensureIsString();
            (0, n_defensive_1.given)(description, "description").ensureIsString();
            this._title = title.trim();
            this._description = description ? description.trim() : null;
        });
    }
    complete() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            (0, n_defensive_1.given)(this, "this").ensure(t => !t._isCompleted, "completing Todo that is already complete");
            this._isCompleted = true;
        });
    }
    delete() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            (0, n_defensive_1.given)(this, "this").ensure(t => !t._isDeleted, "deleting Todo that is already deleted");
            this._isDeleted = true;
        });
    }
}
exports.MockTodoProxy = MockTodoProxy;
//# sourceMappingURL=mock-todo-proxy.js.map