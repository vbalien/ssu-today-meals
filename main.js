import { HashRouter as Router } from "./helper/router/index.js";
import { routes } from "./routes.js";
import "/components/index.js";

const App = document.getElementById("container");
export const router = new Router(App);
router.setRoutes(routes);
