import fs from 'fs';
import csvToJson from 'csvtojson';

async function importCsv(file) {
  const data = await csvToJson().fromFile(file);

  console.log(data);

  fs.writeFileSync('./src/data.json', JSON.stringify(data));
}

const args = process.argv.slice(2);
if(args.length < 1) {
  console.error('Please specify the name of the file to prepare.');
}

importCsv(args[0]);
