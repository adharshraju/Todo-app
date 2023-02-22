"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("@nivinjoseph/n-ext");
require("./styles/main.scss");
require("material-design-icons/iconfont/material-icons.css");
const n_app_1 = require("@nivinjoseph/n-app");
const routes_1 = require("./pages/routes");
const pages_1 = require("./pages/pages");
const n_defensive_1 = require("@nivinjoseph/n-defensive");
const mock_todo_service_1 = require("../sdk/services/todo-service/mock-todo-service");
const components_1 = require("./components/components");
class Installer {
    install(registry) {
        (0, n_defensive_1.given)(registry, "registry").ensureHasValue().ensureIsObject();
        registry
            .registerSingleton("TodoService", mock_todo_service_1.MockTodoService);
    }
}
const client = new n_app_1.ClientApp("#app", "shell")
    .useInstaller(new Installer())
    .registerDialogService(new n_app_1.DefaultDialogService({ accentColor: "#93C5FC" }))
    .registerComponents(...components_1.components)
    .registerPages(...pages_1.pages)
    .useAsInitialRoute(routes_1.Routes.listTodos)
    .useAsUnknownRoute(routes_1.Routes.listTodos)
    .useHistoryModeRouting();
client.bootstrap();
//# sourceMappingURL=client.js.map