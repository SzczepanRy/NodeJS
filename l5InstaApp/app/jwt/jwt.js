import jsonwebtoken from "jsonwebtoken";
const { sign, verify } = jsonwebtoken;
export class Jwt {
    constructor() {}

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
}
