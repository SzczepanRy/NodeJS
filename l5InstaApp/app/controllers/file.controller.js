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
      let dir = ""
      let form = formidable({
        multiples: true,
        encoding: "utf-8",
        allowEmptyFiles: false,
        uploadDir: __dirname + "\\upload\\",
        keepExtensions: true,
        // Use it to control newFilename.
        // filename: (name, ext, part, form) => {
        //   console.log(part);
        //   console.log("AA");
        //   return part.originalFilename; // Will be joined with options.uploadDir.
        // },
      });

      form.on('field', function (field, value) {
        console.log(field);
        if (field == "album") {
          dir = value

          //##################################################################
          //Create dir if it desnt exist
          //##################################################################

        }

        //receive form fields here
      })
      form.on("fileBegin", function (name, file) {
        if (dir != "") {
          file.path = __dirname + "\\upload\\" + `\\${dir}\\` + file.name;

        } else {
          file.path = __dirname + "\\upload\\" + file.name;

        }
      });
      form.parse(req, function (err, fields, files) {
        if (err) {
          reject(err);
        } else {
          // console.log(files);
          resolve({ fields, files });
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
