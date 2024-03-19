import { getRequestData, serveFile } from "./utils.js";
import { controller } from "./controller.js";

const router = async (req, res) => {
    switch (req.method) {
        case "GET":
            if (req.url == "/api/tasks") {
                let resp = controller.getall();
                res.writeHead(200, { "Content-Type": "text/plain;charset=utf-8" });
                res.end(JSON.stringify(resp));
            }
            if (/\/api\/tasks\/[0-9]+/.test(req.url)) {
                let id = +req.url.split("/")[req.url.split("/").length - 1];

                let resp = controller.getbyid(id);
                res.writeHead(200, { "Content-Type": "text/plain;charset=utf-8" });
                res.end(JSON.stringify(resp));
            }

        case "POST":
            if (req.url == "/api/tasks") {
                let data = await getRequestData(req);

                let resp = controller.add(data);
                res.writeHead(200, { "Content-Type": "text/plain;charset=utf-8" });
                res.end(JSON.stringify(resp));
            }

            break;
        case "PATCH":
            if (req.url == "/api/tasks") {
                let data = await getRequestData(req);

                let resp = controller.update(data);
                res.writeHead(200, { "Content-Type": "text/plain;charset=utf-8" });
                res.end(JSON.stringify(resp));
            }
            break;
        case "DELETE":
            if (/\/api\/tasks\/[0-9]+/.test(req.url)) {
                let id = +req.url.split("/")[req.url.split("/").length - 1];

                let resp = controller.delete(id);

                res.writeHead(200, { "Content-Type": "text/plain;charset=utf-8" });
                res.end(JSON.stringify(resp));
            }
            break;
    }
};

export default router;
