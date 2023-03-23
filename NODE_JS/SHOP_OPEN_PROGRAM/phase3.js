const schedule = require("./shop.json").shop;

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
    dailyShopStatus[s.day].open = true;
    [dailyShopStatus[s.day].openHr, dailyShopStatus[s.day].openMin] = getHrMin(
      s.open
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
