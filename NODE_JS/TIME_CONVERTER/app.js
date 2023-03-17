const inquirer = require("inquirer");
const fs = require("fs");
const { getTime } = require("./getTime");

const timeZone = JSON.parse(
  fs.readFileSync("timezone.json", { encoding: "utf-8" })
).data;

//cli quations
const quations = [
  {
    type: "input",
    name: "CURRENT_TIME",
    message: "CURRENT_TIME",
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

inquirer.prompt(quations).then((answers) => {
  const CONVERT_TO_TIMEZONE_OFFSET = getOffSet(answers.CONVERT_TO_TIMEZONE);
  const convertedTime = getTime(
    answers.CURRENT_TIMEZONE,
    answers.CURRENT_TIME,
    timeZone,
    CONVERT_TO_TIMEZONE_OFFSET
  );

  console.log("CONVERTED_TIMEZONE: ", convertedTime);
});
