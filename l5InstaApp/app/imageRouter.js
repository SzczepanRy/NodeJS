import { getRequestData, parseFileToJson } from "./readReq.js";
import formidable from "formidable";
const imageRouter = async (fileController, jsonController, req, res) => {
  switch (req.method) {
    case "GET":
      if (req.url == "/api/photos") {
        let resp = jsonController.getAll();

        res.writeHead(200, {
          "Content-Type": "application/json;charset=utf-8",
        });
        res.end(JSON.stringify(resp));
        break;
      }
      if (/\/api\/photos\/[0-9]+/.test(req.url)) {
        let id = +req.url.split("/")[req.url.split("/").length - 1];

        let resp = jsonController.getSingle(id);
        res.writeHead(200, {
          "Content-Type": "application/json;charset=utf-8",
        });
        res.end(JSON.stringify(resp));
        break;
      }


    case "POST":
      if (req.url == "/api/photos") {
        // let data = await getRequestData(req);

        // console.log(data);
        //   let dataJSON = JSON.parse(data);


        // console.log(getAlbumFromMultiform(data));



        // let form = formidable({
        //   // multiples: true,
        //   encoding: "utf-8",
        //   allowEmptyFiles: false,
        //   uploadDir: "upload",
        //   keepExtensions: true,
        //   // Use it to control newFilename.
        //   filename: (name, ext, part, form) => {
        //     return part.originalFilename; // Will be joined with options.uploadDir.
        //   },
        // });

        // // /  / / form.on("fileBegin", function (name, file) {
        // //   console.log(__dirname + "\\upload\\" + file.originalFilename);
        // //   file.path = __dirname + "\\upload\\" + file.originalFilename;
        // // });
        // form.parse(req, function (err, fields, files) {
        //   console.log(fields, files);
        //   // if (err) {
        //   //   reject(err);
        //   // } else {
        //   //   // console.log(files);
        //   //   resolve(files);
        //   // }


        // });

        let { fields, files } = await fileController.createFile(req);
        let dataJSON = parseFileToJson(files);
        // console.log(fields);
        let resp = jsonController.addSingle(dataJSON);
        res.writeHead(200, {
          "Content-Type": "application/json;charset=utf-8",
        });
        // res.end(JSON.stringify(resp));
        res.end("ok");
      }

      break;
    case "PATCH":
      if (req.url == "/api/photos") {
        let data = await getRequestData(req);

        //##############################################
        //for now works only on json because i dont know under what req i should update file on form or on regullar req.
        //if form do they hae to have the same names to trigger update ??
        //##############################################
        let dataJSON = JSON.parse(data);
        let resp = jsonController.updataSingle(dataJSON.id, dataJSON.log);

        res.writeHead(200, {
          "Content-Type": "application/json;charset=utf-8",
        });
        res.end(JSON.stringify(resp));
      }
      break;
    case "DELETE":
      if (/\/api\/photos\/[0-9]+/.test(req.url)) {
        let id = +req.url.split("/")[req.url.split("/").length - 1];

        let { message, value } = jsonController.deleteSingle(id);
        let resp;
        if (value) {
          resp = await fileController.deleteFile(value);
        } else {
          resp = { message: "did not find id ", value: null };
        }

        res.writeHead(200, {
          "Content-Type": "application/json;charset=utf-8",
        });
        res.end(JSON.stringify(resp));
      }
      break;
  }
};

export default imageRouter;
