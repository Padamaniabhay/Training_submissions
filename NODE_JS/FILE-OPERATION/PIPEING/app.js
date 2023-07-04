const fs = require("fs");
const { Transform } = require("stream");

const readStream = fs.createReadStream("lowercase.txt");
const writeStream = fs.createWriteStream("uppercase.txt");

transformToUpperCase = () => {
  return new Transform({
    transform(chunk, encoding, callback) {
      const upperCaseChunk = chunk.toString().toUpperCase();
      callback(null, upperCaseChunk);
    },
  });
};

readStream.pipe(transformToUpperCase()).pipe(writeStream);
