import { createServer } from "http";
import { totalmem, freemem } from "os";
import * as fs from "fs";
import * as path from "path";

const __dirname = path.resolve();
const server = createServer((req, res) => {
    let url = decodeURI(req.url);
    if (url == "/") {
        fs.readFile(__dirname + "/index.html", (err, data) => {
            if (err) {
                res.writeHead(404, { "Content-Type": "text/html" });
                res.write("<h1>błąd 404 - nie ma pliku!<h1>");
                res.end();
            } else {
                res.writeHead(200, { "Content-Type": "text/html" });
                res.write(data);
                res.end();
            }
        });
    } else if (url == "/index.js") {
        fs.readFile(__dirname + "/index.js", (err, data) => {
            if (err) {
                res.writeHead(404, { "Content-Type": "text/html" });
                res.write("<h1>błąd 404 - nie ma pliku!<h1>");
                res.end();
            } else {
                res.writeHead(200, { "Content-Type": "application/javascript" });
                res.write(data);
                res.end();
            }
        });
    } else if (url == "/data") {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ totalmem: process.memoryUsage().heapTotal, usedmem: process.memoryUsage().heapUsed }));
    }
});

server.listen(3000, () => {
    console.log(`serwer startuje na porcie 3000`);
});
