import sharp from "sharp";
export default class FilterController {
    async meta(fileObj) {
        return new Promise(async (resolve, reject) => {
            try {
                if (fileObj.url) {
                    let meta = await sharp(fileObj.url).metadata();
                    resolve(meta);
                } else {
                    resolve("url_not_found");
                }
            } catch (err) {
                reject(err.mesage);
            }
        });
    }
    async rotate(deg, fileObj) {
        return new Promise(async (resolve, reject) => {
            // try {
            if (fileObj.url) {
                // let ServerPath =
                // `/uploads/${fileObj.album}/${fileObj.originalName.split(".")[0]}-rotate${
                //     fileObj.originalName.split(".")[1]
                // }`

                //Error: Input file contains unsupported image format
                let meta = await sharp(fileObj.url).rotate(deg).toFile(`ugabuga.jpg`);
                resolve(meta);
            } else {
                resolve("url_not_found");
            }
            // } catch (err) {
            //     reject(err.mesage);
            // }
        });
    }
    async resize(w, h, fileObj) {
        return new Promise(async (resolve, reject) => {
            try {
                if (fileObj.url) {
                    let meta = await sharp(fileObj.url)
                        .resize({
                            width: w,
                            height: h,
                        })
                        .toFile(
                            `../../uploads/${fileObj.album}/${fileObj.originalName.split(".")[0]}-resize${
                                fileObj.originalName.split(".")[1]
                            }`
                        );
                    resolve(meta);
                } else {
                    resolve("url_not_found");
                }
            } catch (err) {
                reject(err.mesage);
            }
        });
    }
    async reformat(format, fileObj) {
        return new Promise(async (resolve, reject) => {
            try {
                if (fileObj.url) {
                    let meta = await sharp(fileObj.url)
                        .reformat(format)
                        .toFile(
                            `../../uploads/${fileObj.album}/${fileObj.originalName.split(".")[0]}-reformat${
                                fileObj.originalName.split(".")[1]
                            }`
                        );
                    resolve(meta);
                } else {
                    resolve("url_not_found");
                }
            } catch (err) {
                reject(err.mesage);
            }
        });
    }
    async crop(w, h, left, top, fileObj) {
        return new Promise(async (resolve, reject) => {
            try {
                if (fileObj.url) {
                    let meta = await sharp(fileObj.url)
                        .extract({ width: w, height: h, left: left, top: top })
                        .toFile(
                            `../../uploads/${fileObj.album}/${fileObj.originalName.split(".")[0]}-crop${
                                fileObj.originalName.split(".")[1]
                            }`
                        );
                    resolve(meta);
                } else {
                    resolve("url_not_found");
                }
            } catch (err) {
                reject(err.mesage);
            }
        });
    }
    async grayscale(fileObj) {
        return new Promise(async (resolve, reject) => {
            try {
                if (fileObj.url) {
                    let meta = await sharp(fileObj.url)
                        .grayscale()
                        .toFile(
                            `../../uploads/${fileObj.album}/${fileObj.originalName.split(".")[0]}-grayscale${
                                fileObj.originalName.split(".")[1]
                            }`
                        );
                    resolve(meta);
                } else {
                    resolve("url_not_found");
                }
            } catch (err) {
                reject(err.mesage);
            }
        });
    }
    async grayscale(fileObj) {
        return new Promise(async (resolve, reject) => {
            try {
                if (fileObj.url) {
                    let meta = await sharp(fileObj.url)
                        .grayscale()
                        .toFile(
                            `../../uploads/${fileObj.album}/${fileObj.originalName.split(".")[0]}-grayscale${
                                fileObj.originalName.split(".")[1]
                            }`
                        );
                    resolve(meta);
                } else {
                    resolve("url_not_found");
                }
            } catch (err) {
                reject(err.mesage);
            }
        });
    }
    async flip(fileObj) {
        return new Promise(async (resolve, reject) => {
            try {
                if (fileObj.url) {
                    let meta = await sharp(fileObj.url)
                        .flip()
                        .toFile(
                            `../../uploads/${fileObj.album}/${fileObj.originalName.split(".")[0]}-flip${
                                fileObj.originalName.split(".")[1]
                            }`
                        );
                    resolve(meta);
                } else {
                    resolve("url_not_found");
                }
            } catch (err) {
                reject(err.mesage);
            }
        });
    }
    async tint(r, g, b, fileObj) {
        return new Promise(async (resolve, reject) => {
            try {
                if (fileObj.url) {
                    let meta = await sharp(fileObj.url)
                        .tint({ r: r, g: g, b: b })
                        .toFile(
                            `../../uploads/${fileObj.album}/${fileObj.originalName.split(".")[0]}-tint${
                                fileObj.originalName.split(".")[1]
                            }`
                        );
                    resolve(meta);
                } else {
                    resolve("url_not_found");
                }
            } catch (err) {
                reject(err.mesage);
            }
        });
    }
}
