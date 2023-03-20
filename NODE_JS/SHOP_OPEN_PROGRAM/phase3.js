const inquirer = require("inquirer");
const schedule = require("./shop.json").shop;

const isOpen = (time) => {
  const day = time.split(" ")[0];
  const amPm = time.split(" ")[2];
  let timeHr = parseInt(time.split(" ")[1].split(":")[0]);
  const timeMin = parseInt(time.split(" ")[1].split(":")[1]);
  timeHr += amPm === "PM" ? 12 : 0;

  const currTime = new Date();
  currTime.setHours(timeHr);
  currTime.setMinutes(timeMin);

  let shopStatus = "close";

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

      //generate date object of open and close time
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
      ) {
        const diff = (
          (shopCloseTime.getTime() - currTime.getTime()) /
          (1000 * 60 * 60)
        ).toFixed(2);
        shopStatus = `open, The shop will be closed within ${diff} Hrs`;
      }
    }
  });

  const week = [
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
    "Sun",
  ];

  let dailyShopStatus = [];
  for (let i = 0; i < 7; i++) {
    dailyShopStatus[week[i]] = {
      open: false,
    };
  }

  schedule.forEach((s) => {
    const amPm = time.split(" ")[1].slice(-2);
    dailyShopStatus[s.day].open = true;
    dailyShopStatus[s.day].openHr = parseInt(
      s.open.split(" ")[0].split(":")[0]
    );
    dailyShopStatus[s.day].openHr += amPm === "PM" ? 12 : 0;
    dailyShopStatus[s.day].openMin = parseInt(
      s.open.split(" ")[0].split(":")[1]
    );
  });

  if (shopStatus === "close") {
    let i = 0;
    for (; i < 7; i++) {
      if (day === week[i]) break;
    }
    let weekidx = i;
    for (; i < 14; i++) {
      if (dailyShopStatus[week[i]].open) {
        if (week[i] === week[weekidx]) {
          if (timeHr < dailyShopStatus[week[i]].openHr) {
            break;
          } else {
            continue;
          }
        } else break;
      }
    }
    let diff =
      24 -
      (timeHr + timeMin / 60) +
      (i - weekidx - 1) * 24 +
      dailyShopStatus[week[i]].openHr;

    let noOfDay = parseInt(diff / 24);
    let noOfHr = (diff % 24).toFixed(2);
    if (noOfDay) {
      shopStatus = `close, The shop will be open within ${noOfDay} days and ${noOfHr} Hrs`;
    } else
      diff = shopStatus = `close, The shop will be open within ${noOfHr} Hrs`;
  }

  return shopStatus;
};

module.exports = isOpen;
