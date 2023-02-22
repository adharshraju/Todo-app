"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IndexController = void 0;
const tslib_1 = require("tslib");
const n_web_1 = require("@nivinjoseph/n-web");
const n_config_1 = require("@nivinjoseph/n-config");
const n_ject_1 = require("@nivinjoseph/n-ject");
const n_defensive_1 = require("@nivinjoseph/n-defensive");
let IndexController = class IndexController extends n_web_1.Controller {
    constructor(callContext, logger) {
        super();
        (0, n_defensive_1.given)(callContext, "callContext").ensureHasValue().ensureIsObject();
        this._callContext = callContext;
        (0, n_defensive_1.given)(logger, "logger").ensureHasValue().ensureIsObject();
        this._logger = logger;
    }
    execute() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const env = n_config_1.ConfigurationManager.getConfig("env");
            if (env !== "dev") {
                const protocol = this._callContext.getRequestHeader("X-Forwarded-Proto");
                if (protocol !== "https")
                    this.redirect("https" + this._callContext.href.substr(4));
            }
            return {
                config: {
                    apiUrl: n_config_1.ConfigurationManager.getConfig("apiUrl")
                }
            };
        });
    }
};
IndexController = tslib_1.__decorate([
    (0, n_web_1.route)("/*"),
    n_web_1.httpGet,
    (0, n_web_1.view)("~/src/client/dist/index-view.html"),
    (0, n_ject_1.inject)("CallContext", "Logger"),
    tslib_1.__metadata("design:paramtypes", [Object, Object])
], IndexController);
exports.IndexController = IndexController;
//# sourceMappingURL=index-controller.js.map