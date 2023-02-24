// const fs = require("fs");

// // fs.writeFileSync("notes.txt", "hello, my name is abhay");
// // fs.appendFileSync("notes1.txt", "hii, my name is abhay");

// const getNotes = require("./notes.js");
const validator = require("validator");
const yargs = require("yargs");

//to set version
yargs.version("1.1.0");

yargs.command({
  command: "add",
  describe: "add new note",
  handler: () => {
    console.log("note added");
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
  command: "remove",
  describe: "remove note",
  handler: () => {
    console.log("note removed");
  },
});
yargs.command({
  command: "list",
  describe: "list all note",
  handler: () => {
    console.log("all note listed");
  },
});
yargs.command({
  command: "read",
  describe: "read note",
  handler: () => {
    console.log("read note");
  },
});

// console.log(validator.isEmail("abc@gmail.com"), process.argv);
console.log(process.argv, yargs.argv);
