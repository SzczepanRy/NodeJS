import { getRequestData, serveFile } from "./utils.js";


const router = async (req, res) => {

    switch (req.method) {
        case "GET":
            let url = decodeURI(req.url)
            if (url == '/') {

                serveFile("index.html", res)
            } else {
                let name = url.substring(1)
                serveFile(name, res)
            }

        case "POST":

            if (req.url == "/add") {
                // odczytaj dane z body
                // użyj odpowiedniej funkcji z controllera
                // odpowiedz do klienta
                let data = await getRequestData(req);
                console.log(data);
                controller.add(data)
                res.writeHead(200, { 'Content-Type': 'text/plain;charset=utf-8' });
                res.end(JSON.stringify({ status: "status", data: "some data" }))
            }
            else if (req.url == "/getall") {
                //  pobierz dane z tablicy zwierząt i odpowiedz do klienta
            }
            else if (req.url == "/delete") {
                //  usuń dane z tablicy zwierząt i odpowiedz do klienta
            }
            else if (req.url == "/update") {
                //  updatuj dane z tablicy zwierząt i odpowiedz do klienta
            }
            // pozostałe funkcje

            break;

    }
}

export default router