import { getRequestData, parseFileToJson, validate } from "./readReq.js";
import fs from "fs";
import { __dirname } from "./readReq.js";
import { error } from "console";

const filterRouter = async (userController, req, res) => {
    switch (req.method) {
        case "GET":
            let resp = { success: false, message: 'nothing worked' }

            let { success, message } = JWT.validateTokenHeader(req)
            if(!success){
                resp  = {success , message}
            }else{
                resp = userController.valdateToken()
            }
            // let data = await getRequestData(req);
            res.writeHead(200, {
                "Content-Type": "application/json;charset=utf-8",
            });
            res.end(JSON.stringify(resp));

            userController.valdiateToken()
            break;
        case "GET":

            //let authStr = req.headers.authorization || null
            break;
        case "GET":
            break;
        case "GET":
            break;

    }
};

export default filterRouter;
