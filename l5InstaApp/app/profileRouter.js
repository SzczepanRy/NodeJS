import { getRequestData } from "./readReq.js";
import { __dirname } from "./readReq.js";
import { Jwt } from "./jwt/jwt.js";
const profileRouter = async (fileConrtoller, userController, req, res) => {
    switch (req.method) {
        case "GET":
            if (true) {
                let resp = { success: false, message: 'nothing worked' }

                let { success, message } = Jwt.validateTokenHeader(req)
                if (!success) {
                    resp = { success, message }
                } else {
                    resp = await userController.validateToken(message)
                }

                // let data = await getRequestData(req);
                res.writeHead(200, {
                    "Content-Type": "application/json;charset=utf-8",
                });
                res.end(JSON.stringify(resp));
            }
            break;
        case "PATCH":
            if (true) {
                let resp = { success: false, message: 'nothing worked' }
                let data = await getRequestData(req);
                let dataJSON = JSON.parse(data);


                let { success, message } = Jwt.validateTokenHeader(req)
                if (!success) {
                    resp = { success, message }
                } else {
                    resp = await userController.updateUser(dataJSON, message)
                }

                res.writeHead(200, {
                    "Content-Type": "application/json;charset=utf-8",
                });
                res.end(JSON.stringify(resp));


            }

            //let authStr = req.headers.authorization || null
            break;
        case "POST":
            if (true) {

                let resp = { success: false, message: 'nothing worked' }

                let { success, message } = Jwt.validateTokenHeader(req)
                if (!success) {
                    resp = { success, message }
                } else {
                    resp = await userController.validateToken(message)

                    await fileConrtoller.createProfile(req,resp.foundUser.email)
                    resp = {succes : true , message:"profile save succesfuly"}
                }


                res.writeHead(200, {
                    "Content-Type": "application/json;charset=utf-8",
                });
                res.end(JSON.stringify(resp));




            }
            break;

    }
};

export default profileRouter;
