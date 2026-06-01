const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Middleware
app.use((req, res, next) => {
    console.log("MIDDLE-WARE");
    next();
});

app.use((req, res, next) => {
    console.log("SECOND MIDDLE-WARE");
    next();
});

// MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/myDB")
    .then(() => console.log("Connected"))
    .catch((err) => console.log("error occurred", err));

// Schema
const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String },
    email: { type: String, required: true }
}, { timestamps: true });

// Model
const User = mongoose.model("User", userSchema);

// Routes
app.route("/api/users")

    .get(async (req, res) => {
        const users = await User.find({});
        res.status(200).json(users);
    })

    .post(async (req, res) => {
        try {
            const { firstName, lastName, email } = req.body;

            const newUser = await User.create({
                firstName,
                lastName,
                email
            });

            res.status(201).json(newUser);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });

app.get("/api/users/:id", async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
})

app.patch("/api/users/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const updatedUser = await User.findByIdAndUpdate(
            id,
            req.body,
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(updatedUser);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
app.delete("/api/users/:id", async (req, res) => {
    const { id } = req.params;
    const deleted = await User.findByIdAndDelete(id);
    if (!deleted) {
        return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({
        message: "User deleted successfully",
        user: deleted
    });
})
// Server
app.listen(3000, () => {
    console.log("SERVER IS RUNNING NOW");
});