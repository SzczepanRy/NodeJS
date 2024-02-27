import { createServer } from "http";

import tracer from "tracer"
const logger = tracer.colorConsole();

const PORT = 3000;
const server = createServer((req, res) => {
    let url = decodeURI(req.url)
    console.log(url);
    if (url != "/favico.ico") {
        let color = url.substring(1)

        switch (color) {
            case "żółć":
                res.writeHead(200, { "content-type": "text/plain;charset=utf-8" })
                logger.warn(color)
                res.end(color)
                break;
            case "zieleń":
                res.writeHead(200, { "content-type": "text/plain;charset=utf-8" })
                logger.info(color)

                res.end(color)
                break;
            case "czerwień":
                res.writeHead(200, { "content-type": "text/plain;charset=utf-8" })
                logger.error(color)

                res.end(color)
                break;
        }

    }

})

server.listen(PORT, () => {
    console.log(`serwer startuje na porcie ${PORT}`)
});
