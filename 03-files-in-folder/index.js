const fs = require('fs');
const path = require('path');

const pathToFolder = path.join(__dirname, 'secret-folder');

fs.readdir(pathToFolder, {withFileTypes:true}, (err, elements) => {
  if(err) throw err;
  const files = elements.filter(el => el.isFile() === true);
  files.forEach((file) => {
    const pathToFile = path.join(pathToFolder, file.name);
    const fileObj = path.parse(pathToFile); 
    fs.stat(pathToFile, (err, stats) => {
      if(err) throw err;
      const size = stats.size;
      console.log(
        `${fileObj.name} - ${fileObj.ext.slice(1)} - ${size.toString()}b`
      );
    });
  });
});
