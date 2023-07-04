const fs = require("fs");

const schedule = JSON.parse(
  fs.readFileSync("shop.json", { encoding: "utf-8" })
).shop;

const getDate = (hr, min) => {
  const date = new Date();
  date.setHours(hr);
  date.setMinutes(min);

  return date;
};

const getHrMin = (time) => {
  const amPm = time.slice(-2);
  time = time.slice(0, -3);
  const timeHr = parseInt(time.split(":")[0]) + (amPm === "PM" ? 12 : 0);
  const timeMin = parseInt(time.split(":")[1]);
  return [timeHr, timeMin];
};

const isOpen = (day, time) => {
  const [timeHr, timeMin] = getHrMin(time);

  //generate date object of current time
  const currTime = getDate(timeHr, timeMin);

  //initially shopstatus will be closed
  let shopStatus = "close";

  schedule.forEach((s) => {
    if (s.day === day) {
      //open time spliting
      const [shopTimeHrOpen, shopTimeMinOpen] = getHrMin(s.open);

      //close time spliting
      const [shopTimeHrClose, shopTimeMinClose] = getHrMin(s.close);

      //generate date object of open and close time
      const shopOpenTime = getDate(shopTimeHrOpen, shopTimeMinOpen);
      const shopCloseTime = getDate(shopTimeHrClose, shopTimeMinClose);

      //compare milliseconds
      if (
        currTime.getTime() >= shopOpenTime.getTime() &&
        currTime.getTime() <= shopCloseTime.getTime()
      )
        shopStatus = "open";
    }
  });
  return shopStatus;
};

module.exports = isOpen;
