import { createServer } from "http";
const PORT = 3000;
const server = createServer((req, res) => {
    res.writeHead(200, { "content-type": "text/plain;charset=utf-8" })
    res.end(`<h2> ${JSON.stringify(req.headers, null, 5)}</h2>`)
    // text/plain
    // text/html
    // application/json
    // text/xml
    // video/mp4
    // image/jpeg
    // image/png
    // text/css
    // application/javascript
    // audio/mpeg
})

server.listen(PORT, () => {
    console.log(`serwer startuje na porcie ${PORT}`)
});
