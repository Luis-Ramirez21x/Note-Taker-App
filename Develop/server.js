const express = require('express');
const path = require('path');
const fs = require('fs');
const uid = require('./helper/uniqueId');

const PORT = 3001;
const notes = require('./db/db.json');
const dataBase = fs.readFileSync("./db/db.json");
const currentDataBase = JSON.parse(dataBase);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.get('/notes', (req,res) =>{
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});

app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "public/index.html"))
);


app.get('/api/notes', (req,res) => {
    res.json(currentDataBase);
});

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