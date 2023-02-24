"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ManageTodoViewModel = void 0;
const tslib_1 = require("tslib");
const n_app_1 = require("@nivinjoseph/n-app");
require("./manage-todo-view.scss");
const n_ject_1 = require("@nivinjoseph/n-ject");
const n_defensive_1 = require("@nivinjoseph/n-defensive");
const n_validate_1 = require("@nivinjoseph/n-validate");
const routes_1 = require("../routes");
let ManageTodoViewModel = class ManageTodoViewModel extends n_app_1.PageViewModel {
    constructor(todoService, navigationService) {
        super();
        (0, n_defensive_1.given)(todoService, "todoService").ensureHasValue().ensureIsObject();
        (0, n_defensive_1.given)(navigationService, "navigationService").ensureHasValue().ensureIsObject();
        this._todoService = todoService;
        this._navigationService = navigationService;
        this._isNew = false;
        this._todo = null;
        this._title = "";
        this._description = "";
        this._date = "";
        this._validator = this._createValidator();
    }
    get isNew() { return this._isNew; }
    get title() { return this._title; }
    set title(value) { this._title = value; }
    get description() { return this._description; }
    set description(value) { this._description = value; }
    get date() { return this._date; }
    set date(value) { this._date = value; }
    get hasErrors() { return !this._validate(); }
    get errors() { return this._validator.errors; }
    save() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this._validator.enable();
            if (!this._validate())
                return;
            try {
                if (this._todo)
                    yield this._todo.update(this._title, this._description, this._date);
                else
                    yield this._todoService.createTodo(this._title, this._description, this._date);
            }
            catch (e) {
                console.log(e);
                return;
            }
            this._navigationService.navigate(routes_1.Routes.listTodos);
        });
    }
    onEnter(id) {
        if (id && !id.isEmptyOrWhiteSpace()) {
            this._isNew = false;
            this._todoService.getTodo(id)
                .then(t => {
                this._todo = t;
                this._title = t.title;
                this._description = t.description || "";
                this._date = t.date || "";
            })
                .catch(e => console.log(e));
        }
        else {
            this._isNew = true;
        }
    }
    _validate() {
        this._validator.validate(this);
        return this._validator.isValid;
    }
    _createValidator() {
        const validator = new n_validate_1.Validator(true);
        validator
            .prop("title")
            .isRequired().withMessage("The title field is required.")
            .isString()
            .useValidationRule(n_validate_1.strval.hasMaxLength(50));
        validator
            .prop("description")
            .isOptional()
            .isString()
            .useValidationRule(n_validate_1.strval.hasMaxLength(500));
        validator
            .prop("date")
            .isOptional()
            .isString();
        return validator;
    }
};
ManageTodoViewModel = tslib_1.__decorate([
    (0, n_app_1.template)(require("./manage-todo-view.html")),
    (0, n_app_1.route)(routes_1.Routes.manageTodo),
    (0, n_ject_1.inject)("TodoService", "NavigationService"),
    tslib_1.__metadata("design:paramtypes", [Object, Object])
], ManageTodoViewModel);
exports.ManageTodoViewModel = ManageTodoViewModel;
//# sourceMappingURL=manage-todo-view-model.js.map