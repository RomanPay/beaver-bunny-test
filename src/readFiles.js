const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, './assets/images');
const files = fs.readdirSync(directoryPath);
const outputJSON = path.join(__dirname, 'imagesKeys.js');

console.log("start read files");

const list = [];

readFolder(directoryPath, list);

function readFolder(folderPath, assetsList, subFolder = "/")
{
	const files = fs.readdirSync(folderPath + subFolder);

	for (const file of files)
	{
		if (fs.statSync(path.resolve(folderPath + subFolder, file)).isFile())
		{
			let prefix = './assets/images';
			prefix = prefix.split('./assets/images').join('');
			const src =  './assets/images' + subFolder + file;
			assetsList.push({ alias: prefix + file.split('.')[0], src });

			console.warn({ alias: prefix + file.split('.')[0], src });
		}

		else
			readFolder(folderPath, assetsList, subFolder + '/' + file + '/');
	}
}

const output = `export const ImageKeys = ${JSON.stringify(list, null, 2)}`;

fs.writeFile(outputJSON, output, e => console.error(e));
