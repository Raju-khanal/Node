const express = require("express");
const fs = require("fs");
const app = express();
const users = require("./MOCK_DATA.json")
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use((req, res, next) => {
    console.log("MIDLLE-WARE");
    next();

})
app.use((req, res, next) => {
    console.log("SECOND MIDDLE-WARE")
    next();

})
app.route("/api/users").get((req, res) => {
    res.status(200).json(users);
})
app.listen(3000, () => {
    console.log("SERVER IS RUNNING NOW");
})