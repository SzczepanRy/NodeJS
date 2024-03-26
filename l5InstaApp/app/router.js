import { getRequestData } from "./readReq.js";



const router = async (fileController, jsonController, req, res) => {
    switch (req.method) {
        case "GET":
            if (req.url == "/api/photos") {
                let resp = "res"
                res.writeHead(200, { "Content-Type": "text/plain;charset=utf-8" });
                res.end(JSON.stringify(resp));
            }
            if (/\/api\/photos\/[0-9]+/.test(req.url)) {
                let id = +req.url.split("/")[req.url.split("/").length - 1];



                let resp = "res"
                res.writeHead(200, { "Content-Type": "text/plain;charset=utf-8" });
                res.end(JSON.stringify(resp));
            }

        case "POST":
            if (req.url == "/api/photos") {
                let data = await getRequestData(req);
                let resp = "res"

                res.end(JSON.stringify(resp));
            }

            break;
        case "PATCH":
            if (req.url == "/api/photos") {
                let data = await getRequestData(req);

                let resp = "res"
                res.writeHead(200, { "Content-Type": "text/plain;charset=utf-8" });
                res.end(JSON.stringify(resp));
            }
            break;
        case "DELETE":
            if (/\/api\/photos\/[0-9]+/.test(req.url)) {
                let id = +req.url.split("/")[req.url.split("/").length - 1];

                let resp = "res"
                res.writeHead(200, { "Content-Type": "text/plain;charset=utf-8" });
                res.end(JSON.stringify(resp));
            }
            break;
    }
};

export default router;
