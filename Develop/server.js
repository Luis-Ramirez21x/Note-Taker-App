const express = require('express');
const path = require('path');
const fs = require('fs');
const uid = require('./helper/uniqueId');

const PORT = 3001;
const notes = require('./db/db.json');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
    console.log('home');
});

app.get('/notes', (req,res) =>{
    res.sendFile(path.join(__dirname, '/public/notes.html'));
    console.log('notes');
});

app.get('/api/notes', (req,res) => {
    res.json(notes);
});

app.post('/api/notes', (req,res) =>{
    console.log(`${req.method} method received`);

    const { title, text}  = req.body;
    
    if(title && text){
    const note = {
        title,
        text,
        id: uid(),
    };

    fs.readFile('./db/db.json', 'utf8', (err,data) =>{
        if(err){
            console.log(err);
        }else {
            const parsedNotes = JSON.parse(data);

            parsedNotes.push(note);

            fs.writeFile('./db/db.json', JSON.stringify(parsedNotes, null, 4), (writeErr) =>
            (writeErr) =>
            writeErr
              ? console.error(writeErr)
              : console.info('Successfully updated reviews!')
            );
        }
    });

    const response = {
        status :'success',
        body: note,
    };

        res.json(note);
    }else {
        res.status(500).json('Error in posting Note');
    }
})


app.listen(PORT, () => 
    console.log(`App listening at http://localhost:${PORT}`)
);