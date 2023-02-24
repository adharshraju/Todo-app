"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IntroSectionViewModel = void 0;
const tslib_1 = require("tslib");
const n_app_1 = require("@nivinjoseph/n-app");
require("./intro-section-view.scss");
let IntroSectionViewModel = class IntroSectionViewModel extends n_app_1.ComponentViewModel {
};
IntroSectionViewModel = tslib_1.__decorate([
    (0, n_app_1.template)(require("./intro-section-view.html")),
    (0, n_app_1.element)("intro")
], IntroSectionViewModel);
exports.IntroSectionViewModel = IntroSectionViewModel;
//# sourceMappingURL=intro-section-view-model.js.map