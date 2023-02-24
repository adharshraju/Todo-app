"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DecoGlassViewModel = void 0;
const tslib_1 = require("tslib");
const n_app_1 = require("@nivinjoseph/n-app");
const routes_1 = require("../routes");
require("./deco-glass-view.scss");
const intro_section_view_model_1 = require("./components/intro-section/intro-section-view-model");
let DecoGlassViewModel = class DecoGlassViewModel extends n_app_1.PageViewModel {
};
DecoGlassViewModel = tslib_1.__decorate([
    (0, n_app_1.template)(require("./deco-glass-view.html")),
    (0, n_app_1.route)(routes_1.Routes.decoGlass),
    (0, n_app_1.components)(intro_section_view_model_1.IntroSectionViewModel)
], DecoGlassViewModel);
exports.DecoGlassViewModel = DecoGlassViewModel;
//# sourceMappingURL=deco-glass-view-model.js.map