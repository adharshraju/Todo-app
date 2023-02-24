"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListTodosViewModel = void 0;
const tslib_1 = require("tslib");
const n_app_1 = require("@nivinjoseph/n-app");
require("./list-todos-view.scss");
const n_ject_1 = require("@nivinjoseph/n-ject");
const n_defensive_1 = require("@nivinjoseph/n-defensive");
const routes_1 = require("../routes");
let ListTodosViewModel = class ListTodosViewModel extends n_app_1.PageViewModel {
    constructor(todoService) {
        super();
        (0, n_defensive_1.given)(todoService, "todoService").ensureHasValue().ensureIsObject();
        this._todoService = todoService;
        this._todos = [];
    }
    get todos() {
        const sortedTodos = this._todos.slice().sort((a, b) => {
            if (a.date && b.date) {
                return new Date(a.date).getTime() - new Date(b.date).getTime();
            }
            else if (a.date) {
                return -1;
            }
            else {
                return 1;
            }
        });
        return sortedTodos.where(t => !t.isDeleted);
    }
    onCreate() {
        super.onCreate();
        console.log("on Create, when the Vm is created, but the template has not been mounted in the DOM.");
    }
    onMount(element) {
        super.onMount(element);
        console.log("onMount, when the page template is mounted on the DOM, you get the HTML element as a parameter here to manipulate it, like using Jquery for example.");
    }
    onEnter() {
        super.onEnter();
        console.log("onEnter, when the page has appeared, usually used to fetch data to show on the page. The parameters for this function would be any query/path params of the url defined in the route");
        this._todoService.getTodos()
            .then(t => this._todos = t)
            .catch(e => console.log(e));
    }
    onLeave() {
        super.onLeave();
        console.log("onLeave, when the user is about to leave the page.");
    }
    onDestroy() {
        super.onDestroy();
        console.log("onDestroy, when the page is removed from the DOM.");
    }
};
ListTodosViewModel = tslib_1.__decorate([
    (0, n_app_1.template)(require("./list-todos-view.html")),
    (0, n_app_1.route)(routes_1.Routes.listTodos),
    (0, n_ject_1.inject)("TodoService"),
    tslib_1.__metadata("design:paramtypes", [Object])
], ListTodosViewModel);
exports.ListTodosViewModel = ListTodosViewModel;
//# sourceMappingURL=list-todos-view-model.js.map