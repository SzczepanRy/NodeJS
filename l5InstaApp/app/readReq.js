import path from "path";
import { readFile } from "fs";
export const __dirname = path.resolve();

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

export const parseFileToJson = (file) => {
  console.log(file.upload[0].originalFilename);
  let data = {};

  const date = Date.now();
  data["id"] = date;
  data["album"] = " -not supported- ";
  data["originalName"] = file.upload[0].originalFilename;
  data["lastChange"] = "original";
  let hist = [
    {
      status: "original",
      timestamp: date,
    },
  ];
  data["history"] = hist;
  return data;
};
