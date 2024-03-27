import { getRequestData } from "./readReq.js";

const router = async (fileController, jsonController, req, res) => {
    switch (req.method) {
        case "GET":
            if (req.url == "/api/photos") {
                let resp = jsonController.getAll();

                res.writeHead(200, { "Content-Type": "application/json;charset=utf-8" });
                res.end(JSON.stringify(resp));
                break;
            }
            if (/\/api\/photos\/[0-9]+/.test(req.url)) {
                let id = +req.url.split("/")[req.url.split("/").length - 1];

                let resp = jsonController.getSingle(id);
                res.writeHead(200, { "Content-Type": "application/json;charset=utf-8" });
                res.end(JSON.stringify(resp));
                break;
            }

        case "POST":
            if (req.url == "/api/photos") {
                let data = await getRequestData(req);

                let dataJSON = JSON.parse(data);

                let resp = jsonController.addSingle(dataJSON);

                // let fr = await fileController.createFile();
                console.log(fr);

                res.writeHead(200, { "Content-Type": "application/json;charset=utf-8" });
                res.end(JSON.stringify(resp));
            }

            break;
        case "PATCH":
            if (req.url == "/api/photos") {
                let data = await getRequestData(req);

                let dataJSON = JSON.parse(data);
                let resp = jsonController.updataSingle(dataJSON.id, dataJSON.log);

                res.writeHead(200, { "Content-Type": "application/json;charset=utf-8" });
                res.end(JSON.stringify(resp));
            }
            break;
        case "DELETE":
            if (/\/api\/photos\/[0-9]+/.test(req.url)) {
                let id = +req.url.split("/")[req.url.split("/").length - 1];

                let resp = jsonController.deleteSingle(id);

                res.writeHead(200, { "Content-Type": "application/json;charset=utf-8" });
                res.end(JSON.stringify(resp));
            }
            break;
    }
};

export default router;
