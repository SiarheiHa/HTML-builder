const fs = require('fs');
const path = require('path');

const pathToFolder = path.join(__dirname, 'files');
const pathToCopy = path.join(__dirname, 'files-copy');


async function copyFolder (pathToFolder, pathToCopy) {
  //   //force <boolean> When true, exceptions will be ignored if path does not exist. Default: false.
  await fs.promises.rm(pathToCopy, {recursive: true, force: true});
  await fs.promises.mkdir(pathToCopy, {recursive: true});
  const files = await fs.promises.readdir(pathToFolder,);
  console.log(files);
  files.forEach( (file) => {
    console.log(file);
    const source = path.join(pathToFolder, file);
    const copy = path.join(pathToCopy, file);
    console.log(source);
    console.log(copy);
    fs.promises.copyFile(source, copy);
  });
}


copyFolder(pathToFolder, pathToCopy);

