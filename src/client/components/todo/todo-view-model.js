"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoViewModel = void 0;
const tslib_1 = require("tslib");
const n_app_1 = require("@nivinjoseph/n-app");
require("./todo-view.scss");
const n_ject_1 = require("@nivinjoseph/n-ject");
const n_defensive_1 = require("@nivinjoseph/n-defensive");
const routes_1 = require("../../pages/routes");
let TodoViewModel = class TodoViewModel extends n_app_1.ComponentViewModel {
    constructor(navigationService) {
        super();
        (0, n_defensive_1.given)(navigationService, "navigationService").ensureHasValue().ensureIsObject();
        this._navigationService = navigationService;
    }
    get todoValue() { return this.getBound("todo"); }
    completeTodo() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                yield this.todoValue.complete();
            }
            catch (e) {
                console.log(e);
            }
        });
    }
    editTodo() {
        this._navigationService.navigate(routes_1.Routes.manageTodo, { id: this.todoValue.id });
    }
    deleteTodo() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                yield this.todoValue.delete();
            }
            catch (e) {
                console.log(e);
            }
        });
    }
    onCreate() {
        super.onCreate();
        console.log("onCreate component");
    }
    onMount(e) {
        super.onMount(e);
        console.log("onMount component");
    }
    onDestroy() {
        super.onDestroy();
        console.log("onDestroy component");
    }
};
TodoViewModel = tslib_1.__decorate([
    (0, n_app_1.template)(require("./todo-view.html")),
    (0, n_app_1.element)("todo"),
    (0, n_app_1.bind)({
        todo: "object"
    }),
    (0, n_ject_1.inject)("NavigationService"),
    tslib_1.__metadata("design:paramtypes", [Object])
], TodoViewModel);
exports.TodoViewModel = TodoViewModel;
//# sourceMappingURL=todo-view-model.js.map