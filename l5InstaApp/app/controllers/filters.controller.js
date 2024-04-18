import sharp from "sharp";

import { validate } from "../readReq.js";
export default class FilterController {
    async handleChange(reqBody, fileObj) {
        let resp = "did not chose valid mode";
        let resVAl;
        switch (reqBody.lastChange) {
            case "meta":
                resVAl = await this.meta(fileObj);
                return { status: "succes", reso: resVAl.reso.meta };
            case "rotate":
                resp = validate(reqBody.deg.toString(), "did not provide deg in json with key deg");
                resVAl = await this.rotate(+reqBody.deg, fileObj);
                return { status: "succes", reso: { val: "ok", url: resVAl.url } };

            case "reformat":
                resp = validate(reqBody.format.toString(), "did not provide format in json with key format");

                resVAl = await this.reformat(reqBody.format, fileObj);
                return { status: "succes", reso: { val: "ok", url: resVAl.url } };
            case "resize":
                resp = validate(reqBody.height.toString(), "did not provide height in json with key height");
                resp = validate(reqBody.width.toString(), "did not provide width in json with key width");
                resVAl = await this.resize(reqBody.height, reqBody.width, fileObj);
                return { status: "succes", reso: { val: "ok", url: resVAl.url } };

            case "crop":
                resp = validate(reqBody.height.toString(), "did not provide height in json with key height");
                resp = validate(reqBody.width.toString(), "did not provide width in json with key width");
                resp = validate(reqBody.top.toString(), "did not provide top in json with key top");
                resp = validate(reqBody.left.toString(), "did not provide left in json with key left");
                resVAl = await this.crop(reqBody.height, reqBody.width, reqBody.left, reqBody.top, fileObj);
                return { status: "succes", reso: { val: "ok", url: resVAl.url } };

            case "grayscale":
                resVAl = await this.grayscale(fileObj);
                return { status: "succes", reso: { val: "ok", url: resVAl.url } };

            case "flip/flop":
                // flip
                resVAl = await this.flip(fileObj);
                return { status: "succes", reso: { val: "ok", url: resVAl.url } };

            case "tint":
                resp = validate(JSON.stringify(reqBody.colors), "did not provide format in json with key colors");
                let { red, green, blue } = reqBody.colors;
                resp = validate(red.toString(), "did not provide format in json with key colors:{red:<val> }");
                resp = validate(green.toString(), "did not provide format in json with key colors:{green:<val> }");
                resp = validate(blue.toString(), "did not provide format in json with key colors:{blue:<val> }");
                resVAl = await this.tint(red, green, blue, fileObj);
                return { status: "succes", reso: { val: "ok", url: resVAl.url } };

            default:
                return { status: "fail", reso: { val: "abd", url: "" } };
        }
    }

    async meta(fileObj) {
        return new Promise(async (resolve, reject) => {
            if (fileObj.url) {
                let meta = await sharp(fileObj.url).metadata();
                resolve({
                    reso: { meta: meta },
                    url: `upload\\${fileObj.album}\\${fileObj.originalName.split(".")[0]}-rotate.${
                        fileObj.originalName.split(".")[1]
                    }`,
                });
            } else {
                reject("url_not_found");
            }
        });
    }
    async rotate(deg, fileObj) {
        return new Promise(async (resolve, reject) => {
            //
            if (fileObj.url) {
                // let ServerPath =
                // `/uploads/${fileObj.album}/${fileObj.originalName.split(".")[0]}-rotate${
                //     fileObj.originalName.split(".")[1]
                // }`

                console.log(fileObj.album);
                //Error: Input file contains unsupported image format
                let meta = await sharp(fileObj.url)
                    .rotate(deg)
                    .toFile(
                        `upload\\${fileObj.album}\\${fileObj.originalName.split(".")[0]}-rotate.${
                            fileObj.originalName.split(".")[1]
                        }`
                    );
                resolve({
                    reso: { meta: meta },
                    url: `upload\\${fileObj.album}\\${fileObj.originalName.split(".")[0]}-rotate.${
                        fileObj.originalName.split(".")[1]
                    }`,
                });
            } else {
                reject("url_not_found");
            }
            // } catch (err) {
            //     reject(err.mesage);
            // }
        });
    }
    async resize(w, h, fileObj) {
        return new Promise(async (resolve, reject) => {
            if (fileObj.url) {
                let meta = await sharp(fileObj.url)
                    .resize({
                        width: w,
                        height: h,
                    })
                    .toFile(
                        `upload\\${fileObj.album}\\${fileObj.originalName.split(".")[0]}-resize.${
                            fileObj.originalName.split(".")[1]
                        }`
                    );
                resolve({
                    reso: { meta: meta },
                    url: `upload\\${fileObj.album}\\${fileObj.originalName.split(".")[0]}-rotate.${
                        fileObj.originalName.split(".")[1]
                    }`,
                });
            } else {
                reject("url_not_found");
            }
        });
    }
    async reformat(format, fileObj) {
        return new Promise(async (resolve, reject) => {
            if (fileObj.url) {
                let meta = await sharp(fileObj.url)
                    .toFormat(format)
                    .toFile(`upload\\${fileObj.album}\\${fileObj.originalName.split(".")[0]}-reformat.${format}`);
                resolve({
                    reso: { meta: meta },
                    url: `upload\\${fileObj.album}\\${fileObj.originalName.split(".")[0]}-reformat.${format}`,
                });
            } else {
                reject("url_not_found");
            }
        });
    }
    async crop(w, h, left, top, fileObj) {
        return new Promise(async (resolve, reject) => {
            if (fileObj.url) {
                let meta = await sharp(fileObj.url)
                    .extract({ width: w, height: h, left: left, top: top })
                    .toFile(
                        `upload\\${fileObj.album}\\${fileObj.originalName.split(".")[0]}-crop.${
                            fileObj.originalName.split(".")[1]
                        }`
                    );
                resolve({
                    reso: { meta: meta },
                    url: `upload\\${fileObj.album}\\${fileObj.originalName.split(".")[0]}-corp.${
                        fileObj.originalName.split(".")[1]
                    }`,
                });
            } else {
                reject("url_not_found");
            }
        });
    }
    async grayscale(fileObj) {
        return new Promise(async (resolve, reject) => {
            if (fileObj.url) {
                let meta = await sharp(fileObj.url)
                    .grayscale()
                    .toFile(
                        `upload\\${fileObj.album}\\${fileObj.originalName.split(".")[0]}-grayscale.${
                            fileObj.originalName.split(".")[1]
                        }`
                    );
                resolve({
                    reso: { meta: meta },
                    url: `upload\\${fileObj.album}\\${fileObj.originalName.split(".")[0]}-grayscale.${
                        fileObj.originalName.split(".")[1]
                    }`,
                });
            } else {
                reject("url_not_found");
            }
        });
    }
    async flip(fileObj) {
        return new Promise(async (resolve, reject) => {
            if (fileObj.url) {
                let meta = await sharp(fileObj.url)
                    .flip()
                    .toFile(
                        `upload\\${fileObj.album}\\${fileObj.originalName.split(".")[0]}-flip.${
                            fileObj.originalName.split(".")[1]
                        }`
                    );
                resolve({
                    reso: { meta: meta },
                    url: `upload\\${fileObj.album}\\${fileObj.originalName.split(".")[0]}-flip.${
                        fileObj.originalName.split(".")[1]
                    }`,
                });
            } else {
                reject("url_not_found");
            }
        });
    }
    async tint(r, g, b, fileObj) {
        return new Promise(async (resolve, reject) => {
            if (fileObj.url) {
                let meta = await sharp(fileObj.url)
                    .tint({ r: r, g: g, b: b })
                    .toFile(
                        `upload\\${fileObj.album}\\${fileObj.originalName.split(".")[0]}-tint.${
                            fileObj.originalName.split(".")[1]
                        }`
                    );
                resolve({
                    reso: { meta: meta },
                    url: `upload\\${fileObj.album}\\${fileObj.originalName.split(".")[0]}-tint.${
                        fileObj.originalName.split(".")[1]
                    }`,
                });
            } else {
                reject("url_not_found");
            }
        });
    }
}
