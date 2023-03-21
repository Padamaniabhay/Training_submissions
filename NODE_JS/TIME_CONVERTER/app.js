const inquirer = require("inquirer");
const fs = require("fs");
const { getTime } = require("./getTime");
const timeZone = JSON.parse(
  fs.readFileSync("timezone.json", { encoding: "utf-8" })
).data;

//cli questions
const questions = [
  {
    type: "input",
    name: "CURRENT_TIME",
    message: "time in HH:MM PM format: ",
    default() {
      const date = new Date();
      return date
        .toLocaleString("en-US", {
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        })
        .toString();
    },
    validate(time) {
      const regex = /^(1[012]|[1-9]|0[1-9]):[0-5][0-9](\s)(AM|PM)$/i;
      if (regex.test(time)) return true;
      return "please enter in correct format";
    },
  },
  {
    type: "input",
    name: "CURRENT_TIMEZONE",
    message: "CURRENT_TIMEZONE: ",
    default() {
      const getTimeZone = (timzone) => {
        let abbr = "";
        timeZone.forEach((zone) => {
          zone.utc.forEach((utc) => {
            if (utc === timzone) abbr = zone.abbr;
          });
        });

        return abbr;
      };

      return getTimeZone(Intl.DateTimeFormat().resolvedOptions().timeZone);
    },
  },
  {
    type: "input",
    name: "CONVERT_TO_TIMEZONE",
    message: "CONVERT_TO_TIMEZONE abbr: ",
  },
];

(async function () {
  let answers = await inquirer.prompt(questions);
  const convertedTime = getTime(
    answers.CURRENT_TIMEZONE,
    answers.CURRENT_TIME,
    answers.CONVERT_TO_TIMEZONE
  );

  console.log("CONVERTED_TIMEZONE: ", convertedTime);
})();
