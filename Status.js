const express = require("express");
const fs = require("fs");

const app = express();
const users = require("./MOCK_DATA.json");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use((req, res, next) => {
    console.log("MIDDLEWARE");
    next();
});

app.use((req, res, next) => {
    console.log("SECOND MIDDLEWARE");
    next();
});

app.route("/api/users")

    .get((req, res) => {
        res.setHeader("x-name", "rajukhanal");
        return res.status(200).json(users);
    })

    .post((req, res) => {
        const { email, first_name, last_name, gender } = req.body;

        // validation
        if (!email || !first_name || !last_name || !gender) {
            return res.status(400).json({
                message: "Please fill full input"
            });
        }

        // duplicate check
        const filtered = users.find(
            (user) => user?.email === email
        );

        if (filtered) {
            return res.status(409).json({
                message: "User already exists"
            });
        }

        users.push(req.body);

        res.setHeader("x-author", "RAJU KHANAL");

        fs.writeFile(
            "./MOCK_DATA.json",
            JSON.stringify(users, null, 2),
            (err) => {
                if (err) {
                    return res.status(500).json({
                        message: "Error saving user"
                    });
                }

                return res.status(201).json({
                    message: "Created"
                });
            }
        );
    });

app.listen(3000, () => {
    console.log("SERVER IS RUNNING NOW");
});