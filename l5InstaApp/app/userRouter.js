import { getRequestData } from "./readReq.js";
const userRouter = async (userController, req, res) => {
    switch (req.method) {
        case "GET":
            if (/\/api\/user\/confirm\/.+/.test(req.url)) {
                let token = req.url.split("/")[req.url.split("/").length - 1];

                console.log(token);
                let resp = await userController.confirm(token);
                res.writeHead(200, {
                    "Content-Type": "application/json;charset=utf-8",
                });
                res.end(JSON.stringify(resp));
                break;
            }

        case "POST":
            if (req.url == "/api/user/login") {
                let data = await getRequestData(req);

                data = JSON.parse(data);

                let resp = userController.login(data);
                res.writeHead(200, {
                    "Content-Type": "application/json;charset=utf-8",
                });
                res.end(JSON.stringify(resp));
                break;
            }
            if (req.url == "/api/user/register") {
                let data = await getRequestData(req);

                data = JSON.parse(data);
                // utworzenie nowego taga

                let resp = await userController.redgister(data);
                res.setHeader('Authorization', 'Bearer '+ resp.token);

                res.writeHead(200, {
                    "Content-Type": "application/json;charset=utf-8",
                });
                res.end(JSON.stringify(resp));
                break;
            }
    }
};

export default userRouter;
