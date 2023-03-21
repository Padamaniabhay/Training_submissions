const fs = require("fs");
const timeZone = JSON.parse(
  fs.readFileSync("timezone.json", { encoding: "utf-8" })
).data;

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

const toMiliseconds = (cur_time) => {
  const arr = cur_time.split(" ");
  let hr = parseInt(arr[0].split(":")[0]);
  const min = parseInt(arr[0].split(":")[1]);

  arr[1] === "PM" ? (hr += 12) : hr;

  const date = new Date();
  date.setHours(hr);
  date.setMinutes(min);

  return date.getTime();
};

const getTime = (cur_timezone, cur_time, convert_timezone) => {
  //find offset of both timezone from timezone.json file
  const convert_offset = getOffSet(convert_timezone);
  const cur_offset = getOffSet(cur_timezone);

  if (!convert_offset || !cur_offset) return "enter valid time zone";

  //utc = current milliseconds - offset of current timezone
  const utc = toMiliseconds(cur_time) + -(cur_offset * 60) * 60000;

  //new timezone milliseconds = utc + CONVERT_TO_TIMEZONE offset * 3600000
  const newTime = utc + 3600000 * convert_offset;

  return new Date(newTime).toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
};

module.exports.getTime = getTime;
