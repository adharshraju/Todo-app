"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShellViewModel = void 0;
const tslib_1 = require("tslib");
const n_app_1 = require("@nivinjoseph/n-app");
require("./shell-view.scss");
let ShellViewModel = class ShellViewModel extends n_app_1.ComponentViewModel {
};
ShellViewModel = tslib_1.__decorate([
    (0, n_app_1.template)(require("./shell-view.html")),
    (0, n_app_1.element)("shell")
], ShellViewModel);
exports.ShellViewModel = ShellViewModel;
//# sourceMappingURL=shell-view-model.js.map