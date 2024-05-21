import { createServer } from "http";
import imageRouter from "./app/imageRouter.js";
import tagRouter from "./app/tagRouter.js";
import userRouter from "./app/userRouter.js";
import profileRouter from "./app/profileRouter.js";
import filterRouter from "./app/filtersRouter.js";
import "dotenv/config";

import TagController from "./app/controllers/tag.controller.js";
import FileController from "./app/controllers/file.controller.js";
import JsonController from "./app/controllers/json.controller.js";
import FilterController from "./app/controllers/filters.controller.js";
import { UserController } from "./app/controllers/user.controller.js";
let jc = new JsonController();
let fc = new FileController();
let tc = new TagController();
let fic = new FilterController();
let uc = new UserController();
createServer(async (req, res) => {
    if (req.url.search("/api/photos") != -1) {
        await imageRouter(fc, jc, req, res);
    } else if (req.url.search("/api/tags") != -1) {
        await tagRouter(tc, req, res);
    } else if (req.url.search("/api/filters") != -1) {
        await filterRouter(fic, jc, req, res);
    } else if (req.url.search("/api/user") != -1) {
        await userRouter(uc, req, res);
    }else if (req.url.search("/api/profile") != -1) {
        await profileRouter(fc , uc, req, res);
    }
}).listen(process.env.APP_PORT, () => console.log("listen on 3000"));
