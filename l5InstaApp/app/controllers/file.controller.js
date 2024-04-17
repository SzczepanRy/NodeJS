import formidable from "formidable";
import path from "path";
import fs from "fs";
import { __dirname } from "../readReq.js";
import { rejects } from "assert";
export default class FileController {
    constructor() {
        // this.__dirname = path.resolve();
    }

    async createFile(req) {
        return new Promise((resolve, reject) => {
            let form = formidable({
                // multiples: true,
                encoding: "utf-8",
                allowEmptyFiles: false,
                uploadDir: __dirname + "\\upload\\",
                keepExtensions: true,
                // Use it to control newFilename.
            });
            let dir = "";
            form.on("field", function (name, field) {
                dir = field;
                dir = dir.replace(" ", "");

                // this shit doesnt work on windows console.log(!fs.existsSync());
                console.log(path.join(__dirname, "\\upload\\" + dir));
                fs.mkdir(path.join(__dirname, "\\upload\\" + dir), (err) => {
                    if (err) {
                        console.log("folder exsists");
                    } else {
                        console.log("created folder");
                    }
                });
            });

            form.parse(req, function (err, fields, files) {
                if (err) {
                    reject(err);
                } else {
                    fs.rename(files.file.path, __dirname + "\\upload\\" + `${dir}\\` + files.file.name, function (err) {
                        if (err) throw err;
                        console.log("Successfully renamed and moved");
                    });
                    files.file.path = __dirname + "\\upload\\" + `${dir}\\` + files.file.name;

                    resolve({ fields, files, dir });
                }
            });
        });
    }
    async deleteFile(file) {
        return new Promise((resolve, reject) => {
            fs.stat("./upload/" + file.originalName, function (err, stats) {
                if (err) {
                    reject({
                        message: "item with the id does not exist in the upload dir ",
                        value: null,
                    });
                }

                fs.unlink("./upload/" + file.originalName, function (err) {
                    if (err) {
                        reject({
                            message: "could not delete item ",
                            value: null,
                        });
                    }
                    resolve({
                        message: "deleted succesfuly",
                        value: null,
                    });
                });
            });
        });
    }
}
