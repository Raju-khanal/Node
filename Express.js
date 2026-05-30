const express = require("express");
const app = express();
const PORT = 3000;
app.get("/", (req, res) => {
    res.send("HELLO");
})
app.get("/about", (req, res) => {
    const name = req.query.name;
    res.send(`HELLO FORM ABOUT SECTION ${name}`);
})
app.listen(PORT, () => {
    console.log("SERVER", `${PORT}`)
})