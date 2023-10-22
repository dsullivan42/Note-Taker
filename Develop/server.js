const express = require('express');
const path = require('path');
const fs = require('fs');
const PORT = 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get()("/", (req, res) =>
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

const appendData = (data) => {
    fs.readFile("./db/db.json", JSON.stringify(data), (err) => {
        if (err) throw err;
    });
}

app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);