import formidable, { errors as formidableErrors } from "formidable";
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
        multiples: true,
        encoding: "utf-8",
        allowEmptyFiles: false,
        uploadDir: __dirname + "\\upload\\",
        keepExtensions: true,
        // Use it to control newFilename.
        filename: (name, ext, part, form) => {
          return part.originalFilename; // Will be joined with options.uploadDir.
        },
      });

      // form.on("fileBegin", function (name, file) {
      //   console.log(__dirname + "\\upload\\" + file.originalFilename);
      //   file.path = __dirname + "\\upload\\" + file.originalFilename;
      // });
      form.parse(req, function (err, fields, files) {
        if (err) {
          reject(err);
        } else {
          // console.log(files);
          resolve(files);
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
