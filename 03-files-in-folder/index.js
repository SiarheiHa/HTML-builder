const fs = require('fs');
const path = require('path');

const pathToFolder = path.join(__dirname, 'secret-folder');

// callbacks
// fs.readdir(pathToFolder, {withFileTypes:true}, (err, elements) => {
//   if(err) throw err;
//   const files = elements.filter(el => el.isFile() === true);
//   files.forEach((file) => {
//     const pathToFile = path.join(pathToFolder, file.name);
//     const fileObj = path.parse(pathToFile); 
//     fs.stat(pathToFile, (err, stats) => {
//       if(err) throw err;
//       const size = stats.size;
//       console.log(
//         `${fileObj.name} - ${fileObj.ext.slice(1)} - ${size.toString()}b`
//       );
//     });
//   });
// });

async function readFolder () {
  const inner = await fs.promises.readdir(pathToFolder, {withFileTypes: true});
  getStat(inner)
}
function getStat(inner) {
  const files = inner.filter(el => el.isFile());
  files.forEach(file => {
    const pathToFile = path.join(pathToFolder, file.name);
    const fileObj = path.parse(pathToFile);
    const name = fileObj.name;
    const ext = path.extname(pathToFile).slice(1);
    showStat(name, ext, pathToFile);
  });
}

async function showStat (name, ext, pathToFile) {
  const statObj = await fs.promises.stat(pathToFile);
  const size = statObj.size;
  console.log(`${name} - ${ext} - ${size}b`);
}

readFolder();