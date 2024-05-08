const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, './assets/images');
const files = fs.readdirSync(directoryPath);
const outputJSON = path.join(__dirname, 'imagesKeys.js');

const list = [];

for (const file of files)
{
    const stat = fs.statSync(path.resolve(directoryPath, file))
    console.warn(file);

	let prefix = './assets/images';
	prefix = prefix.split('./assets/images').join('');
	const src =  './assets/images' + '/' + file
	list.push({ alias: prefix + file.split('.')[0], src })

	console.warn({alias: prefix + file.split('.')[0], src });
}

const output = `export const ImageKeys = ${JSON.stringify(list, null, 2)}`;

  console.warn(output);

fs.writeFile(outputJSON, output, e => console.error(e));
