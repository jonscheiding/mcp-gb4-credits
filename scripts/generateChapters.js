import fs from 'fs';
import parseArgs from 'command-line-args';
import csvToJson from 'csvtojson';
import mustache from 'mustache';

async function generateChapters(args) {
  const referenceDate = Date.parse("2000-01-01T00:00:00Z");
  const data = await csvToJson({
    colParser: {
      startTime: f => Date.parse(`2000-01-01T${f}Z`)
    }
  }).fromFile(args['input']);

  const chapters = [];
  let previousChapter, title;

  for(const row of data) {
    if(!row.startTime) {
      title = row.title;
      continue;
    }

    const chapter = {title: row.title, startMs: (row.startTime - referenceDate)}
    
    if(previousChapter !== undefined) {
      previousChapter.endMs = chapter.startMs;
    }

    if(chapter.title) {
      chapters.push(chapter);
    }
    
    previousChapter = chapter;
  }

  const template = fs.readFileSync(`${__dirname}/chapters.mustache`);
  const metadata = {title, chapters};
  const output = mustache.render(template.toString(), metadata);

  console.log(metadata);
  console.log(output);

  fs.writeFileSync(args['output'], output);
}

const args = parseArgs([
  { name: 'input', type: String },
  { name: 'output', type: String }
]);

generateChapters(args).catch(console.error);
