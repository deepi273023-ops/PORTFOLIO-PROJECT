const express = require("express");
const cors = require("cors");
const app = express();
const db = require("./db");

app.use(cors());
app.use(express.json());

db.query("CREATE TABLE IF NOT EXISTS contacts (id SERIAL PRIMARY KEY, name VARCHAR(100), email VARCHAR(100), message TEXT)")
  .then(() => console.log("Contacts table ready"))
  .catch(err => console.log(err));

app.get("/", (req, res) => {
  res.send("Server is running successfully");
});

app.post("/contact", async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).send("Please fill all fields!");
  }
  try {
    await db.query("INSERT INTO contacts (name, email, message) VALUES ($1, $2, $3)", [name, email, message]);
    res.send("Thank you! Your message has been received.");
  } catch (err) {
    console.error(err);
    res.status(500).send("Database error");
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});