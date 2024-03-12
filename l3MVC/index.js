// import { createServer } from "http";
// import { readFile } from "fs";
// import path from "path";
// import tracer from "tracer"
// const logger = tracer.colorConsole();

// const PORT = 3000;
// const __dirname = path.resolve();

// const mypath = path.join(__dirname, "static")
// const serveFile = (name, res) => {

//     let type = name.split(".")[1]
//     type = type == "js" ? "application/javascript" : (type == "png" || type == "jpeg") ? "image/" + type : "text/" + type
//     console.log(type);
//     readFile(path.join(mypath, name), (error, data) => {
//         if (error) {
//             res.writeHead(404, { 'Content-Type': 'text/html' });
//             res.write("<h1>błąd 404 - nie ma pliku!<h1>");
//             res.end();
//         } else {

//             res.writeHead(200, { 'Content-Type': type });
//             res.write(data);

//             res.end();
//         }
//     });
// }

// const server = createServer((req, res) => {
//     let url = decodeURI(req.url)
//     if (url == '/') {


//     } else {
//         let name = url.substring(1)
//         serveFile(name, res)
//     }




// })

// server.listen(PORT, () => {
//     console.log(`serwer startuje na porcie ${PORT}`)
// });
import { createServer } from 'http';
import router from "./app/router.js";

createServer((req, res) => router(req, res))
    .listen(3000, () => console.log("listen on 3000"))
