import fs from 'fs';
import csvToJson from 'csvtojson';

async function prepareCsv(file) {
  const data = await csvToJson().fromFile(file);

  console.log(data);

  fs.writeFileSync('./src/credits.json', JSON.stringify(data, null, '  '));
}

const args = process.argv.slice(2);
if(args.length < 1) {
  console.error('Please specify the name of the file to prepare.');
}

prepareCsv(args[0]);
