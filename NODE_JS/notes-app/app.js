const notes = require("./notes.js");
const yargs = require("yargs");

//to set version
yargs.version("1.1.0");

yargs.command({
  command: "add",
  describe: "add new note",
  builder: {
    title: {
      describe: "title of note",
      demandOption: true,
      type: "string",
    },
    body: {
      describe: "body of note",
      demandOption: true,
      type: "string",
    },
  },
  handler: (argv) => {
    notes.addNote(argv.title, argv.body);
  },
});
yargs.command({
  command: "remove",
  describe: "remove note",
  handler: (argv) => {
    notes.removeNote(argv.title);
  },
  builder: {
    title: {
      describe: "title of note",
      demandOption: true,
      type: "string",
    },
  },
});
yargs.command({
  command: "list",
  describe: "list all note",
  handler: () => {
    notes.listNotes();
  },
});
yargs.command({
  command: "read",
  describe: "read note",
  builder: {
    title: {
      describe: "title of note",
      demandOption: true,
      type: "string",
    },
  },
  handler: (argv) => {
    notes.readNote(argv.title);
  },
});

yargs.parse();
