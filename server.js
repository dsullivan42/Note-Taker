const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;
//Middleware for parsing JSON and urlencoded form data
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//Get route for the main page
app.get("/", (req, res) => {
res.sendFile(path.join(__dirname, './public/index.html'))
});
//Get route for the notes page
app.get("/notes", (req, res) => {
res.sendFile(path.join(__dirname, './public/notes.html'))
});
//Get route for the notes api
app.get("/api/notes", (req, res) => {
    fs.readFile("./db/db.json", "utf8", (err, data) => {
        if (err) throw err;
        const savedNotes = JSON.parse(data);
        res.json(savedNotes);
    })
});
//Post route for the notes api. This will add a new note to the db.json file
app.post("/api/notes", (req, res) => {
    fs.readFile("./db/db.json", "utf8", (err, data) => {
        if (err) throw err;
        const savedNotes = JSON.parse(data);
        //create a new note with the data from the request body
        const newNote = {
            title: req.body.title,
            text: req.body.text,
            id: savedNotes.length + 1,
        }
        //add the new note to the array of note objects
        savedNotes.push(newNote);
        fs.writeFile("./db/db.json", JSON.stringify(savedNotes), (err) => {
            if (err) throw err;
            res.json(savedNotes);
        });
    });
});
//Delete route for the notes api. This will delete a note from the db.json file
app.delete("/api/notes/:id", (req, res) => {
    fs.readFile("./db/db.json", "utf8", (err, data) => {
        if (err) throw err;
        const savedNotes = JSON.parse(data);
        const newNotes = savedNotes.filter((note) => note.id != req.params.id);
        fs.writeFile("./db/db.json", JSON.stringify(newNotes), (err) => {
            if (err) throw err;
            res.json(newNotes);
        });
    });
});
//listen on PORT (in our case, 3001)
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
});