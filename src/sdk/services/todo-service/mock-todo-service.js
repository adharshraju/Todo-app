"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockTodoService = void 0;
const n_defensive_1 = require("@nivinjoseph/n-defensive");
const mock_todo_proxy_1 = require("../../proxies/todo/mock-todo-proxy");
class MockTodoService {
    constructor() {
        const todos = new Array();
        const count = 10;
        for (let i = 0; i < count; i++)
            todos.push(new mock_todo_proxy_1.MockTodoProxy("id" + i, "title" + i, "description" + i));
        this._todos = todos;
        this._counter = count;
    }
    getTodos() {
        return Promise.resolve(this._todos);
    }
    getTodo(id) {
        (0, n_defensive_1.given)(id, "id").ensureHasValue().ensureIsString();
        return Promise.resolve(this._todos.find(t => t.id === id));
    }
    createTodo(title, description) {
        (0, n_defensive_1.given)(title, "title").ensureHasValue().ensureIsString();
        (0, n_defensive_1.given)(description, "description").ensureIsString();
        const todo = new mock_todo_proxy_1.MockTodoProxy("id" + this._counter++, title.trim(), description);
        this._todos.push(todo);
        return Promise.resolve(todo);
    }
}
exports.MockTodoService = MockTodoService;
//# sourceMappingURL=mock-todo-service.js.map