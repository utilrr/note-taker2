const express = require("express");
const fs = require("fs");
const path = require("path");
const notesDb = require("./db/db.json");
const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

// GET routes
app.get("/api/notes", (req, res) => {
  res.json(notesDb);
});

// Get notes.html file
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

// POST routes adds notes to json file
app.post("/api/notes", (req, res) => {
  let saveNote = req.body;
  notesDb.push(saveNote);

  let number = 1;
  notesDb.forEach((note) => {
    note.id = number;
    number++;
    return notesDb;
  });
  console.log(notesDb);
  // Writes to database
  writeToDataBase(notesDb);
  res.json(saveNote);
});

// Delete a selected note
app.delete("/api/notes/:id", (req, res) => {
  console.log(req.params.id);
  let jsonFilePath = path.join(__dirname, "/db/db.json");
  // request to delete note by id.
  for (let i = 0; i < notesDb.length; i++) {
    if (notesDb[i].id == req.params.id) {
      // Splice takes i position, and then deletes the 1 note.
      notesDb.splice(i, 1);
      break;
    }
  }
  // Write the db.json file again.
  fs.writeFileSync(jsonFilePath, JSON.stringify(notesDb), function (err) {
    if (err) {
      return console.log(err);
    } else {
      console.log("HOO-RAY, YOUR NOTE WAS DELETED!");
    }
  });
  res.json(notesDb);
});

// Get index.html file. Because of the Asterisk, this Get function must come last.
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

// Run the server
app.listen(PORT, () => {
  console.log(`API SERVER NOW ON ${PORT}!`);
});

// Write to database function
const writeToDataBase = (notesDb) => {
  notesDb = JSON.stringify(notesDb);
  fs.writeFile("./db/db.json", notesDb, (error) => {
    if (error) {
      return console.log(error);
    } else {
      console.log("NOTES ADDED!");
    }
  });
};
