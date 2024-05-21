import formidable from "formidable";
import path from "path";
import fs from "fs";
import { __dirname } from "../readReq.js";
import { rejects } from "assert";
export default class FileController {
    constructor() {
        // this.__dirname = path.resolve();
    }

    async createProfile(req, email) {
        return new Promise((resolve, reject) => {
            if (!email) {
                resolve()
            } else {
                if (!fs.existsSync(`${__dirname}\\${email}`)) {

                    fs.mkdir(path.join(__dirname, `\\${email}\\`), (err) => {
                        console.log(err)
                    })
                }

                let form = formidable({
                    // multiples: true,
                    encoding: "utf-8",
                    allowEmptyFiles: false,
                    uploadDir: __dirname + `\\${email}\\`,
                    keepExtensions: true,
                    // Use it to control newFilename.
                });

                form.parse(req, function (err, fields, files) {
                    if (err) {
                        reject(err);
                    } else {
                        console.log(files)
                        let targetPath = `${__dirname}\\${email}\\profil.png`;

                        fs.rename(files.file.path, targetPath, function (err) {
                            if (err) throw err;
                            console.log("Successfully renamed and moved");
                        });
                        files.file.path = `${__dirname}\\${email}\\profil.png`;

                        resolve({ fields, files });
                    }
                });

            }
        });
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
                dir = dir.replace(" ", "").replace("\n", "").replace("\r", "");

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
                    let name = files.file.name.replace("\n", "").replace("\r", "");
                    files.file.name = name;

                    let targetPath = `${__dirname}\\upload\\${dir}\\${files.file.name}`;

                    fs.rename(files.file.path, targetPath, function (err) {
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
