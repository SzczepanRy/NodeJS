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

export const serveFile = (name, res) => {
    let type = name.split(".")[1];
    type = type == "js" ? "application/javascript" : type == "png" || type == "jpeg" ? "image/" + type : "text/" + type;
    console.log(path.join(mypath, name));
    readFile(path.join(mypath, name), (error, data) => {
        if (error) {
            res.writeHead(404, { "Content-Type": "text/html" });
            res.write("<h1>błąd 404 - nie ma pliku!<h1>");
            res.end();
        } else {
            res.writeHead(200, { "Content-Type": type });
            res.write(data);

            res.end();
        }
    });
};
