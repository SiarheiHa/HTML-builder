const fs = require('fs');
const path = require('path');

const pathToTemplate = path.join(__dirname, 'template.html');
const pathToComponents = path.join(__dirname, 'components');
const pathToStyles = path.join(__dirname, 'styles');
const pathToAssets = path.join(__dirname, 'assets');
const pathToDist = path.join(__dirname, 'project-dist');

// styles
async function buildStyles () {  
  const pathToBundleCSS = path.join(pathToDist, 'style.css');
  
  await fs.promises.rm(pathToBundleCSS, {force:true});
  await fs.promises.writeFile(pathToBundleCSS, '');
  const writeStreamCSS = fs.createWriteStream(pathToBundleCSS);

  const files = await fs.promises.readdir(pathToStyles, {withFileTypes:true});
  const cssFiles = files.filter(file => file.isFile() && file.name.match(/\.css$/));
  cssFiles.reverse().forEach( (file) => {
    const pathToSrcFile = path.join(pathToStyles, file.name);
    const readStream = fs.createReadStream(pathToSrcFile, 'utf-8');
    readStream.pipe(writeStreamCSS);
  });
}

// html
async function buildHTML () {
  let template = await fs.promises.readFile(pathToTemplate,'utf-8');
  // await fs.promises.mkdir(pathToDist, {recursive: true});
  const pathToHtml = path.join(pathToDist, 'index.html');
  const components = await fs.promises.readdir(pathToComponents);
  for (let i = 0; i < components.length; i++) {
    let component = components[i];
    const pathToComponent = path.join(pathToComponents, component);
    const componentCode = await fs.promises.readFile(pathToComponent, 'utf-8');
    const templateTag = (`{{${component.slice(0,-5)}}}`);
    template = template.replace(templateTag, componentCode);
    await fs.promises.writeFile(pathToHtml, template);
  }
}

// assets
async function copyAssets (pathToSRC, pathToDestination) {
  //путь к копии папки
  const pathToCopy = path.join(pathToDestination, path.parse(pathToSRC).name);
  //   //force <boolean> When true, exceptions will be ignored if path does not exist. Default: false.
  await fs.promises.rm(pathToCopy, {recursive: true, force: true});
  await fs.promises.mkdir(pathToCopy, {recursive: true});
  //читает содержимое копируемой папки  
  const items = await fs.promises.readdir(pathToSRC, {withFileTypes : true});
  items.forEach( (item) => {
    const source = path.join(pathToSRC, item.name);
    const copy = path.join(pathToCopy, item.name);
    if(item.isDirectory()) {
      copyAssets(source, pathToCopy);
    } else {
      fs.promises.copyFile(source, copy);
    }
  });
}

async function buildPage () {
  await copyAssets(pathToAssets, pathToDist);
  await buildHTML();
  await buildStyles();  
}

buildPage();