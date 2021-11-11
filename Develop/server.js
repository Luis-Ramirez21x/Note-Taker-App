const express = require("express");
const path = require("path");
const fs = require("fs");
const uid = require("./helper/uniqueId");

const app = express();
const PORT = process.env.PORT || 3001;

const notes = "./db/db.json";
let dataBase = fs.readFileSync(notes);
let currentDataBase = JSON.parse(dataBase);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "public/index.html"))
);

app.get("/api/notes", (req, res) => res.json(currentDataBase));

app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "public/notes.html"))
);

app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "public/index.html"))
);

app.post("/api/notes", (req, res) => {
    const newNote = req.body;
    newNote.id = uid();
    currentDataBase.push(newNote);
    fs.writeFileSync(notes, JSON.stringify(currentDataBase));
    res.json(newNote);
  });


app.listen(PORT, () => 
    console.log(`App listening at http://localhost:${PORT}`)
);