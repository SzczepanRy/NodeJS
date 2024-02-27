import { createServer } from "http";
const PORT = 3000;
const server = createServer((req, res) => {
    // console.log("nagłówki żądania:")
    // console.log(JSON.stringify(req.rawHeaders, null, 5))
    console.log(JSON.stringify(req.headers, null, 5))
    let data = req.headers["user-agent"]
    let line1 = data.split("/")
    let line2 = line1[2].split(" ")


    res.writeHead(200, { "content-type": "text/plain;charset=utf-8" })
    res.end("to jest : " + line2[line2.length - 1])
})

server.listen(PORT, () => {
    console.log(`serwer startuje na porcie ${PORT}`)
});