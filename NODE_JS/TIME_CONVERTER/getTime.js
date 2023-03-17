const toMiliseconds = (cur_time) => {
  const arr = cur_time.split(" ");
  let hr = parseInt(arr[0].split(":")[0]);
  const min = parseInt(arr[0].split(":")[1]);

  arr[1] === "PM" ? (hr += 12) : hr;

  const d = new Date();
  d.setHours(hr);
  d.setMinutes(min);

  return d.getTime();
};

const getTime = (cur_timezone, cur_time, timezone, convert_offset) => {
  let cur_offset = undefined;

  //find offset from timezone.json file
  timezone.forEach((tz) => {
    if (tz.abbr === cur_timezone) cur_offset = tz.offset;
  });

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
