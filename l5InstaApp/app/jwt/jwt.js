import jsonwebtoken from "jsonwebtoken";
const { sign, verify } = jsonwebtoken;
export class Jwt {
    constructor() { }

    static createToken(email) {
        return sign({ email }, process.env.JWT_SECRET, { expiresIn: "60min" });
    }

    static verifyToken(token) {
        try {
            let decoded = verify(token, process.env.JWT_SECRET);
            return { success: true, message: decoded };
        } catch (ex) {
            return { success: false, message: ex.message };
        }
    }
    static vaildateTokenHeader(req) {
        let resp = { success: false, message: 'nothing worked' }
        let authStr = req.headers.authorization || null
        console.log(authStr)
        if (authStr == null) {
            resp = { sucess: false, message: "auth brearen not provided " }
        } else {
            let authArr = authStr.split(" ")
            if (authArr[0] == "Bearer" || authArr[0] == "bearer") {
                //validi
                let token = authArr[1]
                console.log("current token ", token)
                resp = { succes: true, message: token }
            } else {
                resp = { success: false, message: "not valid Auth header " }
            }
        }
        return resp

    }
}
