const fs = require("fs");
const chalk = require("chalk");

loadNotes = () => {
  try {
    const dataJSON = fs.readFileSync("notes.json").toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};

saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync("notes.json", dataJSON);
};

readNote = (title) => {
  const notes = loadNotes();
  const note = notes.find((note) => note.title === title);

  if (note) {
    console.log(chalk.green.inverse(note.title));
    console.log(chalk.green.inverse(note.body));
  } else {
    console.log(chalk.red.inverse("no note found"));
  }
};

listNotes = () => {
  const notes = loadNotes();
  console.log(chalk.inverse("notes:--"));
  notes.forEach((note) => console.log(note.title));
};

addNote = (title, body) => {
  const notes = loadNotes();

  const duplicateNote = notes.find((note) => note.title === title);
  if (!duplicateNote) {
    notes.push({
      title,
      body,
    });
    saveNotes(notes);
    console.log(chalk.green.inverse("new notes added"));
  } else {
    console.log(chalk.red.inverse("title are taken"));
  }
};

removeNote = (title) => {
  const notes = loadNotes();

  const duplicateNotes = notes.filter((note) => note.title !== title);

  if (notes.length > duplicateNotes.length) {
    console.log(chalk.green.inverse("note removes"));
    saveNotes(duplicateNotes);
  } else {
    console.log(chalk.red.inverse("no note found"));
  }
};

module.exports = { addNote, removeNote, listNotes, readNote };
