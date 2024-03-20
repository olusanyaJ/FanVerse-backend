require("./src/config/db");

const express = require("express");
const bodyParser = express.json;
const cors = require("cors");

const app = express();

app.use(cors());
app.use(bodyParser);

const PORT = process.env.PORT;

app.get("/", (_req, res) => {
  try {
    res.send("FanVerse Backend is running!");
  } catch (err) {
    res.status(400).send(`Error retrieving: ${err}`);
  }
});

app.listen(PORT, () => {
  console.log(`server running at http://localhost:${PORT}`);
});
