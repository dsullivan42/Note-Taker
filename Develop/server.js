const express = require('express');
const path = require('path');
const fs = require('fs');
const PORT = 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get()("*", (req, res) =>
res.sendFile(path.join(__dirname, './public/index.html'))
);

app.get()("/notes", (req, res) =>
res.sendFile(path.join(__dirname, './public/notes.html'))
);

app.get()("/api/notes", (req, res) =>
    fs.readFile("./db/db.json", "utf8", (err, data) => {
        if (err) throw err;
        const notes = JSON.parse(data);
        res.json(notes);
    })
);
app.post()("/api/notes", (req, res) => {
    fs.readFile("./db/db.json", "utf8", (err, data) => {
        if (err) throw err;
        const notes = JSON.parse(data);
        const newNote = {
            title: req.body.title,
            text: req.body.text,
            id: notes.length + 1,
        }
        notes.push(newNote);
        fs.writeFile("./db/db.json", JSON.stringify(notes), (err) => {
            if (err) throw err;
            res.json(notes);
        });
    });
});
app.delete()("/api/notes/:id", (req, res) => {
    fs.readFile("./db/db.json", "utf8", (err, data) => {
        if (err) throw err;
        const notes = JSON.parse(data);
        const newNotes = notes.filter((note) => note.id != req.params.id);
        fs.writeFile("./db/db.json", JSON.stringify(newNotes), (err) => {
            if (err) throw err;
            res.json(newNotes);
        });
    });
});

app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);