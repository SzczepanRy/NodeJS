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

// export const getAlbumFromMultiform = (data) => {

//     let validArr = []
//     let strArr = data.split("------")
//     strArr = strArr[strArr.length - 2].split("\n")

//     let i = 0
//     for (let str of strArr) {
//         if (i != 0 && i != strArr.length - 1 && !str.includes("Content-Type:") && !str.includes("Content-Disposition:") && str != "\n" && str != "\r") {
//             validArr.push(str)
//         }
//         i++
//     }
//     //################################ could change in later version
//     console.log(validArr);
//     return validArr[0].replace("\r", "")
// }

export const validate = (val, message) => {
    if (typeof val == "string" || typeof val == "number") {
        return false;
    } else {
        console.log(message);
        return true;
    }
};

export const parseFileToJson = (file, dir) => {
    // console.log(file);
    let data = {};

    const date = Date.now();
    data["id"] = date;
    data["album"] = dir;
    data["url"] = file.path;
    // data["originalName"] = "A";
    data["originalName"] = file.name;
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
