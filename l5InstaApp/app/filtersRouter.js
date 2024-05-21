import { getRequestData, parseFileToJson, validate } from "./readReq.js";
 import fs from "fs";
import { __dirname } from "./readReq.js";
import { error } from "console";

const  filterRouter = async (filterController, jsonController, req, res) => {
    switch (req.method) {
        case "GET":
            if (/^\/api\/filters\/metadata\/[0-9]+$/.test(req.url)) {
                let id = +req.url.split("/")[req.url.split("/").length - 1];

                let { message, value } = jsonController.getSingle(id);

                if (message != "succes") {
                    console.log("did noty find an element with the given id");
                }

                let { status, reso } = await filterController.handleChange({ lastChange: "meta" }, value);
                res.writeHead(200, {
                    "Content-Type": "application/json;charset=utf-8",
                });
                res.end(JSON.stringify({ status, reso }));
                break;
            }
            if (/^\/api\/filters\/getimage\/[0-9]+\/filter\/[a-z]+$/.test(req.url)) {
                let filterName = req.url.split("/")[req.url.split("/").length - 1];
                let id = +req.url.split("/")[4];
                console.log(id);

                let { message, value } = jsonController.getSingle(id);
                if (message != "succes") {
                    console.log("did noty find an element with the given id");
                }
                console.log(message);

                let { status, reso } = await filterController.handleChange({ lastChange: filterName }, value);

                console.log(reso);
                let format = reso.url.split(".")[1];

                //####################################################
                //check if should delete after viewing
                //####################################################
                let img = fs.readFileSync(reso.url);
                res.writeHead(200, {
                    "Content-Type": `image/${format}`,
                });
                res.end(img);
                break;
            }

            if (/^\/api\/filters\/getimage\/[0-9]+$/.test(req.url)) {
                let id = +req.url.split("/")[req.url.split("/").length - 1];

                let { message, value } = jsonController.getSingle(id);

                if (message != "succes") {
                    console.log("did noty find an element with the given id");
                }

                let img = fs.readFileSync(value.url);

                let format = value.url.split(".")[1];

                res.writeHead(200, {
                    "Content-Type": `image/${format}`,
                });
                res.end(img);

                break;
            }

        case "PATCH":
            if (req.url == "/api/filters") {
                let data = await getRequestData(req);
                let dataJSON = JSON.parse(data);

                validate(dataJSON.id, "did not provide id in json with key id");
                let id = dataJSON.id;

                validate(dataJSON.lastChange, "did not lastChange id in json with key lastChange");
                let lastChange = dataJSON.lastChange;
                // {
                //   "id":1713264395460,
                //   "lastChange":"grayscale",
                // }

                let { message, value } = jsonController.getSingle(dataJSON.id);

                if (message != "succes") {
                    console.log("did noty find an element with the given id");
                }

                let { status, reso } = await filterController.handleChange(dataJSON, value);

                let histLog = {
                    status: lastChange,
                    timestamp: Date.now(),
                    url: reso.url,
                };

                jsonController.updateSingle(id, histLog);
                res.writeHead(200, {
                    "Content-Type": "application/json;charset=utf-8",
                });
                res.end(JSON.stringify(status));
            }
            break;
    }
};

export default filterRouter;
