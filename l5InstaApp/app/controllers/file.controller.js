import formidable, { errors as formidableErrors } from "formidable";
import path from "path";

export default class FileController {
    constructor() {
        this.__dirname = path.resolve();
    }

    async createFile() {
        return new Promise((resolve, reject) => {
            let form = formidable({});
            form.multiples = true;
            form.uploadDir = __dirname + "/upload/"; // folder do zapisu zdjęcia
            form.keepExtensions = true;
            form.on("fileBegin", function (name, file) {
                file.path = "/../../upload" + file.name;
            });
            form.parse(req, function (err, fields, files) {
                if (err) {
                    reject(err);
                } else {
                    console.log(files);
                    resolve(files);
                }
            });
        });
    }
}
