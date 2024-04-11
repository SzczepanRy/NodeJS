import { getRequestData } from "./readReq.js";
const tagRouter = async (tagController, req, res) => {
    switch (req.method) {
        case "GET":
            if (req.url == "/api/tags") {
                // pobranie wszystkich tagów z konwersją na obiekty
                let resp = tagController.getAllFormated();

                res.writeHead(200, {
                    "Content-Type": "application/json;charset=utf-8",
                });
                res.end(JSON.stringify(resp));
                break;
            }
            if (req.url == "/api/tags/raw") {
                let resp = tagController.getAllRaw();

                res.writeHead(200, {
                    "Content-Type": "application/json;charset=utf-8",
                });
                res.end(JSON.stringify(resp));
                // pobranie wszystkich tagów bez konwersji na obiekty
                break;
            }
            if (/\/api\/tags\/[0-9]+/.test(req.url)) {
                let id = +req.url.split("/")[req.url.split("/").length - 1];
                // pobranie jednego taga
                let resp = tagController.getSingle(id);
                res.writeHead(200, {
                    "Content-Type": "application/json;charset=utf-8",
                });
                res.end(JSON.stringify(resp));
                break;
            }

        case "POST":
            if (req.url == "/api/tags") {
                let data = await getRequestData(req);

                data = JSON.parse(data);
                // utworzenie nowego taga

                let resp = tagController.addSingle(data);
                res.writeHead(200, {
                    "Content-Type": "application/json;charset=utf-8",
                });
                res.end(JSON.stringify(resp));
                break;
            }
    }
};
// GET /api/tags/raw
// GET /api/tags
// GET /api/tags/1
// POST /api/tags // utworzenie nowego taga
export default tagRouter;
