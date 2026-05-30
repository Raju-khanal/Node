const http = require("http");

const server = http.createServer((req, res) => {

    const myUrl = new URL(req.url, "http://localhost:3000");

    const name = myUrl.searchParams.get("name");

    switch (myUrl.pathname) {
        case "/":
            res.end("Home Page");
            break;

        case "/about":
            res.end(`About ${name}`);
            break;

        default:
            res.end("404");
    }
});

server.listen(3000);