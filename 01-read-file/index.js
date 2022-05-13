const fs = require('fs');

const readStream = fs.createReadStream(`${__dirname}/text.txt`);

readStream.on('data', (chunk) => {
  console.log(chunk.toString());
});
