const express = require("express");
const fs = require("fs");
const app = express();
const path = require("path");
const notesDb = require("./db/db.json");
const PORT = process.env.PORT || 3001;

// runs the server
app.listen(PORT, () => {
  console.log(`API server now on ${PORT}!`);
});

//write to database function
const writeToDataBase = (notesDb) => {
  notesDb = JSON.stringify(notesDb);
  fs.writeFile("./db/db.json", notesDb, (error) => {
    if (error) {
      return console.log(error);
    } else {
      console.log("notes added!");
    }
  });
};
