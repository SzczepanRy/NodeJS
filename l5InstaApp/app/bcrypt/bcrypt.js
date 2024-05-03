import bcryptjs from "bcryptjs";
const { hash, compare } = bcryptjs;
export default class Bcrypt {
    constructor() {}

    static async hashPassword(password) {
        return await hash(password, 10);
    }

    static async validate(password, hash) {
        let decrypted = await compare(password, hash);
        return decrypted;
    }
}
