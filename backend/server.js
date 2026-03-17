const express = require("express");
const cors = require("cors");

const app = express();
const db = require ("./db");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is running successfully ");
});
// Add this below your app.get("/") route
app.post("/contact", (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).send("Please fill all fields!");
    }

    // Optional: Save to database
    // Example if using MySQL:
    const sql = "INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)";
    db.query(sql, [name, email, message], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Database error");
        }
        res.send("Thank you! Your message has been received.");
    });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
