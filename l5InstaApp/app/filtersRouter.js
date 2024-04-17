import { getRequestData, parseFileToJson } from "./readReq.js";

import { __dirname } from "./readReq.js";

const filterRouter = async (filterController, jsonController, req, res) => {
    switch (req.method) {
        case "GET":
            if (/\/api\/filters\/metadata\/[0-9]+/.test(req.url)) {
                let id = +req.url.split("/")[req.url.split("/").length - 1];

                // let resp = jsonController.getSingle(id);

                // pobranie danych meta wybranego zdjęcia

                // potrzebnych do jego obróbki (width,height)

                //Tzn czytanie metadata

                res.writeHead(200, {
                    "Content-Type": "application/json;charset=utf-8",
                });
                res.end(JSON.stringify(resp));
                break;
            }
            if (/\/api\/filters\/getimage\/[0-9]+/.test(req.url)) {
                let id = +req.url.split("/")[req.url.split("/").length - 1];

                // let resp = jsonController.getSingle(id);

                // pobranie pliku zdjęcia (nie jsona zdjęcia) wg id

                //zwracane image

                res.writeHead(200, {
                    "Content-Type": "application/json;charset=utf-8",
                });
                res.end(JSON.stringify(resp));
                break;
            }
            if (/\/api\/filters\/getimage\/[0-9]+\/filter\/[a-z]+/.test(req.url)) {
                let filterName = +req.url.split("/")[req.url.split("/").length - 1];
                let id = +req.url.split("/")[3];

                // let resp = jsonController.getSingle(id);

                //  pobranie pliku przefiltrowanego zdjęcia (nie jsona zdjęcia) wg id i nazwy filtra

                //zwracane image

                res.writeHead(200, {
                    "Content-Type": "application/json;charset=utf-8",
                });
                res.end(JSON.stringify(resp));
                break;
            }
        case "PATCH":
            if (req.url == "/api/filters") {
                console.log("called");
                let data = await getRequestData(req);
                let dataJSON = JSON.parse(data);
                console.log(dataJSON);

                // {
                //   "id":1713264395460,
                //   "lastChange":"grayscale",
                // }

                let { message, value } = jsonController.getSingle(dataJSON.id);
                if (message != "succes") {
                    res.writeHead(200, {
                        "Content-Type": "application/json;charset=utf-8",
                    });
                    res.end("did noty find an element with the given id");
                }

                console.log(value);
                //do some filering
                let resp = await filterController.rotate(90, value);
                console.log(resp);
                res.writeHead(200, {
                    "Content-Type": "application/json;charset=utf-8",
                });
                res.end(JSON.stringify(resp));
            }
            break;
    }
};

export default filterRouter;
