const http = require("http");
const server = http.createServer((req, res) => {
    const myUrl = new URL(req.url, "http://localhost:3000")
    switch (myUrl.pathname) {
        case "/":
            res.end("HOME PAGE");
            break;
        case "/about":
            const name = myUrl.searchParams.get("name");
            res.end("HELLO", `${name}`);
            break;
        default:
            res.end("HELLO BRO");
    }
})