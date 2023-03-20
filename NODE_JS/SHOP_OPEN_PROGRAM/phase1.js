const inquirer = require("inquirer");
const fs = require("fs");

const schedule = JSON.parse(
  fs.readFileSync("shop.json", { encoding: "utf-8" })
).shop;

const isOpen = (time) => {
  const day = time.split(" ")[0];
  const amPm = time.split(" ")[2];
  let timeHr = parseInt(time.split(" ")[1].split(":")[0]);
  const timeMin = parseInt(time.split(" ")[1].split(":")[1]);
  timeHr += amPm === "PM" ? 12 : 0;

  let open = "close";

  schedule.forEach((s) => {
    if (s.day === day) {
      //open time spliting
      const shopAmPmOpen = s.open.split(" ")[1];
      let shopTimeHrOpen = parseInt(s.open.split(" ")[0].split(":")[0]);
      const shopTimeMinOpen = parseInt(s.open.split(" ")[0].split(":")[1]);
      shopTimeHrOpen += shopAmPmOpen === "PM" ? 12 : 0;

      //close time spliting
      const shopAmPmClose = s.close.split(" ")[1];
      let shopTimeHrClose = parseInt(s.close.split(" ")[0].split(":")[0]);
      const shopTimeMinClose = parseInt(s.close.split(" ")[0].split(":")[1]);
      shopTimeHrClose += shopAmPmClose === "PM" ? 12 : 0;

      //generate all date object
      const currTime = new Date();
      currTime.setHours(timeHr);
      currTime.setMinutes(timeMin);

      const shopOpenTime = new Date();
      shopOpenTime.setHours(shopTimeHrOpen);
      shopOpenTime.setMinutes(shopTimeMinOpen);

      const shopCloseTime = new Date();
      shopCloseTime.setHours(shopTimeHrClose);
      shopCloseTime.setMinutes(shopTimeMinClose);

      //compare milliseconds
      if (
        currTime.getTime() >= shopOpenTime.getTime() &&
        currTime.getTime() <= shopCloseTime.getTime()
      )
        open = "open";
    }
  });
  return open;
};

module.exports = isOpen;
