"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pages = void 0;
const deco_glass_view_model_1 = require("./deco-glass/deco-glass-view-model");
const list_todos_view_model_1 = require("./list-todos/list-todos-view-model");
const manage_todo_view_model_1 = require("./manage-todo/manage-todo-view-model");
exports.pages = [
    list_todos_view_model_1.ListTodosViewModel,
    manage_todo_view_model_1.ManageTodoViewModel,
    deco_glass_view_model_1.DecoGlassViewModel
];
//# sourceMappingURL=pages.js.map