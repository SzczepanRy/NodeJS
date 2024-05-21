import Bcrypt from "../bcrypt/bcrypt.js";
import { Jwt } from "../jwt/jwt.js";
import { users } from "../model.js";

export class UserController {
    constructor() {
        this.users = [...users];
    }

    _findByEmail(email) {
        let foundUser = false;
        this.users.map((user) => {
            if (user.email == email) {
                foundUser = user;
            }
        });
        if (!foundUser) {
            return { found: false, foundUser: null };
        } else {
            return { found: true, foundUser };
        }
    }

    async redgister({ name, lastname, email, password }) {
        if (!name || !lastname || !email || !password) {
            return { success: false, message: "wromg data format provide the following keys : name , lastname , email , password"  };
        }
        let { found } = this._findByEmail(email);
        if (found) {
            return { success: false, message: "email alreay taken" };
        }
        this.users = [
            ...this.users,
            {
                id: Date.now(),
                name,
                lastname,
                email,
                confirmed: false,
                password: await Bcrypt.hashPassword(password),
            },
        ];
        return {
            success: true,
            message: `user added you should confirm the account by entering http://localhost:3000/api/user/confirm/${Jwt.createToken(
                email
            )} in your browser within an hour`,
        };
    }

    async confirm(token) {
        let { success, message } = Jwt.verifyToken(token);
        if (!success) {
            return { success, message };
        }
        let { found, foundUser } = this._findByEmail(message.email);
        if (!found) {
            return { success: false, message: "did not find the user email" };
        }
        this.users = this.users.map((user) => {
            if (user.email == message.email) {
                user.confirmed = true;
                return user;
            } else {
                return user;
            }
        });
        return { success: true, message: "sucessfuly added the user" };
    }
    async validateToken(token) {
        let { success, message } = Jwt.verifyToken(token);
        if (!success) {
            return { success, message ,foundUser:false};
        }
        let { found, foundUser } = this._findByEmail(message.email);
        if (!found) {
            return { success: false, message: "did not find the user email" ,foundUser:false};
        }
        if (foundUser.confirmed) {
            return { success: true, message: "sucessfuly found the user", foundUser };
        } else {
            return { success: false, message: "user is not valid",foundUser:false };
        }


    }

    async updateUser({name , lastname} , token){
        let resp =  await this.validateToken(token)
        if(resp.success){
            let {found , foundUser } = this._findByEmail(resp.foundUser.email)
            if(!found){
                return {success : false , message: "did not find user" }
            }else{
                if(name){
                foundUser.name = name
                }
                if(lastname){
                foundUser.lastname = lastname
                }
                this.users = [...this.users ,foundUser]
                return {success: true , message:"rename was successfull"}
            }
        }else{
            return resp
        }
    }

    login({ email, password }) {
        if (!email || !password) {
            return { success: false, message: "wromg data format" };
        }

        let { found, foundUser } = this._findByEmail(email);
        if (!found) {
            return { success: false, message: "did not find the user" };
        }
        let isVlaid = Bcrypt.validate(password, foundUser.password);
        if (!isVlaid) {
            return { success: false, message: "wrong password" };
        }
        return { success: true, message: "login succesful" , token: Jwt.createToken(email) };
    }
}
