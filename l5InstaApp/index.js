import { createServer } from "http";
import imageRouter from "./app/imageRouter.js";
import tagRouter from "./app/tagRouter.js";

import TagController from "./app/controllers/tag.controller.js";
import FileController from "./app/controllers/file.controller.js";
import JsonController from "./app/controllers/json.controller.js";
let jc = new JsonController();
let fc = new FileController();
let tc = new TagController()
createServer(async (req, res) => {

    if (req.url.search("/api/photos") != -1) {
        await imageRouter(fc, jc, req, res)
    }

    else if (req.url.search("/api/tags") != -1) {
        await tagRouter(tc, req, res)
    }

}).listen(3000, () => console.log("listen on 3000"));
