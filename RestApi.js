const express = require("express");
const app = express();
const PORT = 3000;
const users = require("./MOCK_DATA.json");
app.route("/api/users/:id").get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    return res.json(user);
}).post((req, res) => {
}).patch((req, res) => {
}).delete((req, res) => {
})
app.get("/api/users", (req, res) => {
    res.json(users);
})
app.get("/api/user", (req, res) => {
    const name = req.query.name;
    return res.send(`HELLO ${name}`);
})
app.listen(PORT, () => {
    console.log(`SERVER LIVE AT ${PORT}`);
})