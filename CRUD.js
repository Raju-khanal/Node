const fs = require("fs");
const express = require("express");
const users = require("./MOCK_DATA.json");
const app = express();
//midddleware
app.use(express.urlencoded({ extended: false }));

app.post("/api/users", (req, res) => {
    const body = req.body;
    users.push(body)
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err) => {
        console.log("ERROR");
    })

})
app.delete("/api/users/:id", (req, res) => {
    const id = Number(req.params.id);
    const filtered = users.filter((user) => user.id !== id);
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(filtered), (err) => {
        console.log("ERROR OCCURED");
    })
    return res.send(`Deleted SuccessFully ${id}`);
})
app.listen(3000, () => {
    console.log("SERVER RUNNING WELL HERE ")
})