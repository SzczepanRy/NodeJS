import path from "path";
import { readFile } from "fs";
const __dirname = path.resolve();
const mypath = path.join(__dirname, "app/views");
export const getRequestData = async (req) => {
    return new Promise((resolve, reject) => {
        try {
            let body = "";

            req.on("data", (part) => {
                body += part.toString();
            });

            req.on("end", () => {
                // mamy dane i zwracamy z promisy
                resolve(body);
            });
        } catch (error) {
            reject(error);
        }
    });
};