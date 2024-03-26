import { createServer } from "http";
import router from "./app/router.js";

import FileController from "./app/controllers/file.controller.js"
import JsonController from "./app/controllers/json.controller.js"


createServer((req, res) => { router(new FileController(), new JsonController(), req, res) }).listen(3000, () => console.log("listen on 3000"));
