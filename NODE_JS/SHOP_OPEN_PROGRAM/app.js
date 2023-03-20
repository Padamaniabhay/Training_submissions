const inquirer = require("inquirer");
const phase1 = require("./phase1");
const phase2 = require("./phase2");
const phase3 = require("./phase3");

//cli questions
const questions = [
  {
    type: "list",
    name: "Day",
    message: "select Day",
    choices: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  },
  {
    type: "input",
    name: "CURRENT_TIME",
    message: "time ex. 10:00 PM",
    default() {
      return new Date().toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      });
    },
    validate(time) {
      const regex = /^(1[012]|[1-9]|0[1-9]):[0-5][0-9](\s)(AM|PM)$/i;
      if (regex.test(time)) return true;
      return "please enter in correct format";
    },
  },
  {
    type: "list",
    name: "phase",
    message: "select phase",
    choices: ["phase1", "phase2", "phase3"],
  },
];

inquirer.prompt(questions).then((answers) => {
  answers.CURRENT_TIME = answers.Day + " " + answers.CURRENT_TIME.toUpperCase();
  if (answers.phase === "phase1") console.log(phase1(answers.CURRENT_TIME));
  else if (answers.phase === "phase2")
    console.log(phase2(answers.CURRENT_TIME));
  else console.log(phase3(answers.CURRENT_TIME));
});
