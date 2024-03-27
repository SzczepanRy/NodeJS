import Datastore from "nedb";
import { totalmem, freemem } from "os";
import * as fs from "fs";
import * as path from "path";

const coll1 = new Datastore({
    filename: "kolekcja.db",
    autoload: true,
});

const __dirname = path.resolve();

const save = async (x) => {
    return new Promise((resolve, reject) => {
        let i = 0;
        let tab = [];
        try {
            let inter = setInterval(() => {
                if (i < x) {
                    i++;
                    let data = new Date();
                    let min = data.getMinutes();
                    let sec = data.getSeconds();
                    let h = data.getHours();

                    fs.writeFile(
                        __dirname + `/log_${h}_${min}_${sec}`,
                        JSON.stringify({ totalmem: freemem(), freemem: totalmem() }),

                        (err) => {
                            if (err) console.log(err);
                        }
                    );

                    // coll1.insert({ sec, ms })
                    tab.push(`log_${h}_${min}_${sec}`);
                } else {
                    clearInterval(inter);
                    console.log("done");
                    resolve(tab);
                }
            }, 1000);
        } catch (error) {
            reject(error.message);
        }
    });
};

const readAll = async (arr) => {
    return new Promise((resolve, reject) => {
        let files = [];

        let i = 0;

        // for (let name of arr) {

        let inter = setInterval(() => {
            console.log(i);
            if (i == arr.length) {
                clearInterval(inter);
                resolve(files);
            } else {
                fs.readFile(__dirname + "/" + arr[i], "utf8", (err, data) => {
                    if (err) {
                        throw err;
                    } else {
                        console.log(data);
                        files.push(data);
                    }
                });
                i++;
            }
        }, 200);
    });
};

const go = async () => {
    const savedFiles = await save(5);
    const readFiles = await readAll(savedFiles);
    console.log(readFiles);
};

go();
