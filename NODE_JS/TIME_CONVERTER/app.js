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
    message: "time ex: 12:30 PM",
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
    message: "CURRENT_TIMEZONE",
    default() {
      const getTimeZone = (tz) => {
        let tx2 = "";
        timeZone.forEach((el) => {
          el.utc.forEach((e) => {
            if (e === tz) tx2 = el.abbr;
          });
        });

        return tx2;
      };

      return getTimeZone(Intl.DateTimeFormat().resolvedOptions().timeZone);
    },
  },
  {
    type: "input",
    name: "CONVERT_TO_TIMEZONE",
    message: "CONVERT_TO_TIMEZONE",
  },
];

const getOffSet = (convert_to_timezone) => {
  let tx2;
  let flag = false;

  timeZone.forEach((tz) => {
    if (tz.abbr === convert_to_timezone) {
      flag = true;
      tx2 = tz.offset;
    }
  });

  if (flag) return tx2.toString();
  else {
    console.log("No Element found");
  }
};
(async function () {
  let answers = await inquirer.prompt(questions);
  const CONVERT_TO_TIMEZONE_OFFSET = getOffSet(answers.CONVERT_TO_TIMEZONE);
  const convertedTime = getTime(
    answers.CURRENT_TIMEZONE,
    answers.CURRENT_TIME,
    timeZone,
    CONVERT_TO_TIMEZONE_OFFSET
  );

  console.log("CONVERTED_TIMEZONE: ", convertedTime);
})();
