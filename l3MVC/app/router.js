import { getRequestData, serveFile } from "./utils.js";
import controller from "./controller.js";

const router = async (req, res) => {
    switch (req.method) {
        case "GET":
            let url = decodeURI(req.url);
            if (url == "/") {
                serveFile("index.html", res);
            } else {
                let name = url.substring(1);
                serveFile(name, res);
            }

        case "POST":
            console.log(req.url);

            if (req.url == "/add") {
                // odczytaj dane z body
                // użyj odpowiedniej funkcji z controllera
                // odpowiedz do klienta
                let data = await getRequestData(req);

                let resp = controller.add(data);
                res.writeHead(200, { "Content-Type": "text/plain;charset=utf-8" });
                res.end(JSON.stringify(resp));
            } else if (req.url == "/getall") {
                //  pobierz dane z tablicy zwierząt i odpowiedz do klienta
                // let data = await getRequestData(req);

                let resp = controller.getall();
                res.writeHead(200, { "Content-Type": "text/plain;charset=utf-8" });
                res.end(JSON.stringify(resp));
            } else if (/\/delete\/[0-9]+/.test(req.url)) {
                //  usuń dane z tablicy zwierząt i odpowiedz do klienta
                let id = +req.url.split("/")[req.url.split("/").length - 1];

                let data = await getRequestData(req);

                let resp = controller.delete(id);

                res.writeHead(200, { "Content-Type": "text/plain;charset=utf-8" });
                res.end(JSON.stringify(resp));
            } else if (/\/update\/[0-9]+/.test(req.url)) {
                //  updatuj dane z tablicy zwierząt i odpowiedz do klienta
                let id = +req.url.split("/")[req.url.split("/").length - 1];
                let data = await getRequestData(req);

                let resp = controller.update(id, data);
                res.writeHead(200, { "Content-Type": "text/plain;charset=utf-8" });
                res.end(JSON.stringify(resp));
            }
            // pozostałe funkcje

            break;
    }
};

export default router;
